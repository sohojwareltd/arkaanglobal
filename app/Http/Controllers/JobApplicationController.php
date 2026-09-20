<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobApplicationRequest;
use App\Models\JobApplication;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class JobApplicationController extends Controller
{
    public function store(StoreJobApplicationRequest $request): RedirectResponse
    {
        $cvPath = $this->storeUploadedFile($request->file('cv'));

        $photoPath = null;
        $photoOriginalName = null;

        if ($request->file('photo') instanceof UploadedFile) {
            $storedPhoto = $this->storeUploadedFile($request->file('photo'));
            $photoPath = $storedPhoto['path'];
            $photoOriginalName = $storedPhoto['original_name'];
        }

        $application = JobApplication::create([
            'job_posting_id' => $request->validated('job_posting_id'),
            'name' => trim($request->validated('full_name')),
            'email' => strtolower(trim($request->validated('email'))),
            'date_of_birth' => $request->validated('dob'),
            'nationality' => $request->validated('nationality'),
            'gender' => $request->validated('gender'),
            'mobile' => $request->validated('mobile'),
            'current_country' => $request->validated('country'),
            'current_city' => $request->validated('city'),
            'address' => $request->validated('address'),
            'position_applied' => $request->validated('position'),
            'years_experience' => $request->validated('experience'),
            'expected_salary' => $request->validated('salary'),
            'availability' => $request->validated('availability'),
            'preferred_location' => $request->validated('location'),
            'employment_preference' => $request->validated('employment') ?? 'Any',
            'passport_number' => $request->validated('passport'),
            'passport_expiry' => $request->validated('passport_expiry'),
            'visa_status' => $request->validated('visa_status'),
            'available_to_join' => $request->validated('join_date'),
            'mobility_regions' => $request->validated('mobility') ?? [],
            'highest_qualification' => $request->validated('qualification'),
            'field_major' => $request->validated('major'),
            'institution' => $request->validated('institution'),
            'year_completed' => $request->validated('year'),
            'recent_employer' => $request->validated('employer'),
            'employer_country' => $request->validated('employer_country'),
            'employer_position' => $request->validated('employer_position'),
            'employment_history' => $request->validated('employment_history'),
            'technical_skills' => $request->validated('skills') ?? [],
            'other_skills' => $request->validated('other_skills'),
            'certifications_notes' => $request->validated('certifications'),
            'lang_english' => $request->validated('english'),
            'lang_arabic' => $request->validated('arabic'),
            'lang_hindi' => $request->validated('hindi'),
            'lang_bengali' => $request->validated('bengali'),
            'other_language' => $request->validated('other_language'),
            'other_language_level' => $request->validated('other_language_level'),
            'cv_path' => $cvPath['path'],
            'cv_original_name' => $cvPath['original_name'],
            'photo_path' => $photoPath,
            'photo_original_name' => $photoOriginalName,
            'declaration_accepted_at' => now(),
            'status' => 'new',
            'ip_address' => $request->ip(),
        ]);

        $this->storeCertificateFiles($application, $request->file('cert_files', []));
        $this->storeLegacyAttachments($application, $request);

        $application->load(['jobPosting', 'attachments']);

        $this->notifyAdmins($application);

        return redirect()
            ->route('careers.apply', $application->job_posting_id)
            ->with([
                'success' => true,
                'application_number' => $application->application_number,
            ]);
    }

    /** @param  array<int, UploadedFile>  $files */
    private function storeCertificateFiles(JobApplication $application, array $files): void
    {
        foreach ($files as $file) {
            if (! $file instanceof UploadedFile) {
                continue;
            }

            $stored = $this->storeUploadedFile($file);

            $application->attachments()->create([
                'label' => 'Supporting Certificate',
                'file_path' => $stored['path'],
                'original_name' => $stored['original_name'],
            ]);
        }
    }

    private function storeLegacyAttachments(JobApplication $application, StoreJobApplicationRequest $request): void
    {
        $attachments = $request->file('attachments', []);
        $labels = $request->input('attachment_labels', []);

        foreach ($attachments as $index => $attachment) {
            if (! $attachment instanceof UploadedFile) {
                continue;
            }

            $stored = $this->storeUploadedFile($attachment);
            $label = isset($labels[$index]) ? trim((string) $labels[$index]) : null;

            $application->attachments()->create([
                'label' => $label !== '' ? Str::limit($label, 100, '') : 'Additional Document',
                'file_path' => $stored['path'],
                'original_name' => $stored['original_name'],
            ]);
        }
    }

    private function notifyAdmins(JobApplication $application): void
    {
        $notificationEmails = SiteSetting::get('job_application_email') ?? SiteSetting::get('quote_request_email') ?? config('mail.from.address');

        if (! $notificationEmails) {
            return;
        }

        $emails = array_filter(array_map('trim', explode(',', $notificationEmails)));

        if ($emails === []) {
            return;
        }

        $attachmentCount = $application->attachments->count();

        Mail::raw(
            "A new international job application has been submitted.\n\n"
            ."Application No.: {$application->application_number}\n"
            ."Position: {$application->position_applied}\n"
            ."Job Posting: {$application->jobPosting->title_en}\n"
            ."Name: {$application->name}\n"
            ."Mobile: {$application->mobile}\n"
            ."Email: {$application->email}\n"
            ."Nationality: {$application->nationality}\n"
            ."Supporting files: {$attachmentCount}\n"
            ."Submitted: {$application->created_at}\n\n"
            .'Review applications in the admin panel.',
            static function ($message) use ($emails, $application): void {
                $message->to($emails)
                    ->subject("New Application {$application->application_number}: {$application->position_applied}");
            }
        );
    }

    /**
     * @return array{path: string, original_name: string}
     */
    private function storeUploadedFile(UploadedFile $file): array
    {
        $extension = strtolower($file->getClientOriginalExtension());
        $safeName = Str::uuid()->toString().'.'.$extension;

        $path = $file->storeAs(
            'job-applications/'.now()->format('Y/m'),
            $safeName,
            'local',
        );

        return [
            'path' => $path,
            'original_name' => Str::limit($file->getClientOriginalName(), 255, ''),
        ];
    }
}
