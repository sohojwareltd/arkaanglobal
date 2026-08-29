<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobApplicationRequest;
use App\Models\JobApplication;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class JobApplicationController extends Controller
{
    public function store(StoreJobApplicationRequest $request): RedirectResponse
    {
        $file = $request->file('cv');
        $extension = strtolower($file->getClientOriginalExtension());
        $safeName = Str::uuid()->toString().'.'.$extension;

        $path = $file->storeAs(
            'job-applications/'.now()->format('Y/m'),
            $safeName,
            'local',
        );

        $application = JobApplication::create([
            'job_posting_id' => $request->validated('job_posting_id'),
            'name' => trim($request->validated('name')),
            'email' => strtolower(trim($request->validated('email'))),
            'cv_path' => $path,
            'cv_original_name' => Str::limit($file->getClientOriginalName(), 255, ''),
            'status' => 'new',
            'ip_address' => $request->ip(),
        ]);

        $application->load('jobPosting');

        $notificationEmails = SiteSetting::get('job_application_email') ?? SiteSetting::get('quote_request_email') ?? config('mail.from.address');

        if ($notificationEmails) {
            $emails = array_filter(array_map('trim', explode(',', $notificationEmails)));

            if ($emails !== []) {
                Mail::raw(
                    "A new job application has been submitted.\n\n"
                    ."Position: {$application->jobPosting->title_en}\n"
                    ."Name: {$application->name}\n"
                    ."Email: {$application->email}\n"
                    ."Submitted: {$application->created_at}\n\n"
                    .'Review applications in the admin panel.',
                    static function ($message) use ($emails, $application): void {
                        $message->to($emails)
                            ->subject("New Job Application: {$application->jobPosting->title_en}");
                    }
                );
            }
        }

        return back()->with('success', true);
    }
}
