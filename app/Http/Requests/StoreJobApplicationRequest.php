<?php

namespace App\Http\Requests;

use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreJobApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'job_posting_id' => ['required', 'integer', Rule::exists('job_postings', 'id')->where('is_active', true)],
            'name' => ['required', 'string', 'min:2', 'max:255', 'regex:/^[\p{L}\s\'.-]+$/u'],
            'email' => ['required', 'email:rfc,filter', 'max:255'],
            'cv' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            'attachments' => ['nullable', 'array', 'max:5'],
            'attachments.*' => ['file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:5120'],
            'attachment_labels' => ['nullable', 'array'],
            'attachment_labels.*' => ['nullable', 'string', 'max:100'],
            'website' => ['nullable', 'max:0'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'job_posting_id.required' => 'Please select a job to apply for.',
            'job_posting_id.exists' => 'The selected job is no longer available.',
            'name.required' => 'Your full name is required.',
            'name.regex' => 'Please enter a valid name.',
            'email.required' => 'Your email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'cv.required' => 'Please upload your CV.',
            'cv.mimes' => 'CV must be a PDF, DOC, or DOCX file.',
            'cv.max' => 'CV must not exceed 5 MB.',
            'attachments.max' => 'You may upload up to 5 additional documents.',
            'attachments.*.mimes' => 'Additional documents must be PDF, JPG, PNG, DOC, or DOCX.',
            'attachments.*.max' => 'Each additional document must not exceed 5 MB.',
            'website.max' => 'Unable to submit application.',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            if ($this->filled('website')) {
                $validator->errors()->add('website', 'Unable to submit application.');

                return;
            }

            $jobPostingId = $this->integer('job_posting_id');
            $email = strtolower((string) $this->input('email'));

            if ($jobPostingId && $email) {
                $jobPosting = JobPosting::query()->find($jobPostingId);

                if ($jobPosting && ! $jobPosting->isAcceptingApplications()) {
                    $validator->errors()->add('job_posting_id', 'Applications for this position are closed.');
                }

                $recentDuplicate = JobApplication::query()
                    ->where('job_posting_id', $jobPostingId)
                    ->whereRaw('LOWER(email) = ?', [$email])
                    ->where('created_at', '>=', now()->subDay())
                    ->exists();

                if ($recentDuplicate) {
                    $validator->errors()->add('email', 'You have already applied for this position recently. Please wait 24 hours before applying again.');
                }
            }
        });
    }
}
