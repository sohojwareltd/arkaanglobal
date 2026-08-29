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

        $application = JobApplication::create([
            'job_posting_id' => $request->validated('job_posting_id'),
            'name' => trim($request->validated('name')),
            'email' => strtolower(trim($request->validated('email'))),
            'cv_path' => $cvPath['path'],
            'cv_original_name' => $cvPath['original_name'],
            'status' => 'new',
            'ip_address' => $request->ip(),
        ]);

        $attachments = $request->file('attachments', []);
        $labels = $request->input('attachment_labels', []);

        foreach ($attachments as $index => $attachment) {
            if (! $attachment instanceof UploadedFile) {
                continue;
            }

            $stored = $this->storeUploadedFile($attachment);
            $label = isset($labels[$index]) ? trim((string) $labels[$index]) : null;

            $application->attachments()->create([
                'label' => $label !== '' ? Str::limit($label, 100, '') : null,
                'file_path' => $stored['path'],
                'original_name' => $stored['original_name'],
            ]);
        }

        $application->load(['jobPosting', 'attachments']);

        $notificationEmails = SiteSetting::get('job_application_email') ?? SiteSetting::get('quote_request_email') ?? config('mail.from.address');

        if ($notificationEmails) {
            $emails = array_filter(array_map('trim', explode(',', $notificationEmails)));

            if ($emails !== []) {
                $attachmentCount = $application->attachments->count();

                Mail::raw(
                    "A new job application has been submitted.\n\n"
                    ."Position: {$application->jobPosting->title_en}\n"
                    ."Name: {$application->name}\n"
                    ."Email: {$application->email}\n"
                    ."Additional documents: {$attachmentCount}\n"
                    ."Submitted: {$application->created_at}\n\n"
                    .'Review applications in the admin panel.',
                    static function ($message) use ($emails, $application): void {
                        $message->to($emails)
                            ->subject("New Job Application: {$application->jobPosting->title_en}");
                    }
                );
            }
        }

        return redirect()
            ->route('careers.apply', $application->job_posting_id)
            ->with('success', true);
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
