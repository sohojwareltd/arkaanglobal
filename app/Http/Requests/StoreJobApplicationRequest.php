<?php

namespace App\Http\Requests;

use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreJobApplicationRequest extends FormRequest
{
    /** @var list<string> */
    private const MOBILITY_OPTIONS = [
        'Saudi Arabia',
        'GCC',
        'Middle East',
        'Asia',
        'Europe',
        'Worldwide',
    ];

    /** @var list<string> */
    private const SKILL_OPTIONS = [
        'Civil / Structural',
        'Electrical / MEP',
        'Mechanical / Piping',
        'Welding / Fabrication',
        'Scaffolding / Rigging',
        'Heavy Equipment',
        'HVAC',
        'Finishing',
        'QA/QC',
        'HSE',
        'Document Control',
        'Other',
    ];

    /** @var list<string> */
    private const LANGUAGE_LEVELS = [
        'Basic',
        'Intermediate',
        'Good',
        'Fluent',
        'Native',
    ];

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
            'full_name' => ['required', 'string', 'min:2', 'max:255', 'regex:/^[\p{L}\s\'.-]+$/u'],
            'dob' => ['required', 'date', 'before:today'],
            'nationality' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', Rule::in(['Male', 'Female'])],
            'mobile' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email:rfc,filter', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:1000'],
            'position' => ['required', 'string', 'max:255'],
            'experience' => ['required', 'integer', 'min:0', 'max:80'],
            'salary' => ['nullable', 'numeric', 'min:0'],
            'availability' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'employment' => ['nullable', 'string', Rule::in(['Any', 'Permanent', 'Contract', 'Project Based', 'Temporary'])],
            'passport' => ['nullable', 'string', 'max:100'],
            'passport_expiry' => ['nullable', 'date'],
            'visa_status' => ['nullable', 'string', 'max:255'],
            'join_date' => ['nullable', 'date'],
            'mobility' => ['nullable', 'array'],
            'mobility.*' => ['string', Rule::in(self::MOBILITY_OPTIONS)],
            'qualification' => ['nullable', 'string', 'max:255'],
            'major' => ['nullable', 'string', 'max:255'],
            'institution' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'integer', 'min:1950', 'max:'.(date('Y') + 1)],
            'employer' => ['nullable', 'string', 'max:255'],
            'employer_country' => ['nullable', 'string', 'max:255'],
            'employer_position' => ['nullable', 'string', 'max:255'],
            'employment_history' => ['nullable', 'string', 'max:15000'],
            'skills' => ['nullable', 'array'],
            'skills.*' => ['string', Rule::in(self::SKILL_OPTIONS)],
            'other_skills' => ['nullable', 'string', 'max:5000'],
            'certifications' => ['nullable', 'string', 'max:5000'],
            'english' => ['nullable', 'string', Rule::in(self::LANGUAGE_LEVELS)],
            'arabic' => ['nullable', 'string', Rule::in(self::LANGUAGE_LEVELS)],
            'hindi' => ['nullable', 'string', Rule::in(self::LANGUAGE_LEVELS)],
            'bengali' => ['nullable', 'string', Rule::in(self::LANGUAGE_LEVELS)],
            'other_language' => ['nullable', 'string', 'max:100'],
            'other_language_level' => ['nullable', 'string', Rule::in(self::LANGUAGE_LEVELS)],
            'photo' => ['nullable', 'file', 'mimes:jpg,jpeg,png', 'max:5120'],
            'cv' => ['required', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            'cert_files' => ['nullable', 'array', 'max:5'],
            'cert_files.*' => ['file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:5120'],
            'attachments' => ['nullable', 'array', 'max:5'],
            'attachments.*' => ['file', 'mimes:pdf,jpg,jpeg,png,doc,docx', 'max:5120'],
            'attachment_labels' => ['nullable', 'array'],
            'attachment_labels.*' => ['nullable', 'string', 'max:100'],
            'declaration' => ['accepted'],
            'website' => ['nullable', 'max:0'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'Your full name is required.',
            'dob.required' => 'Date of birth is required.',
            'dob.before' => 'Please enter a valid date of birth.',
            'nationality.required' => 'Nationality is required.',
            'gender.required' => 'Please select gender.',
            'mobile.required' => 'Mobile number is required.',
            'email.required' => 'Your email address is required.',
            'position.required' => 'Position / trade applied for is required.',
            'experience.required' => 'Years of experience is required.',
            'cv.required' => 'Please upload your CV.',
            'cv.mimes' => 'CV must be a PDF, DOC, or DOCX file.',
            'photo.mimes' => 'Photo must be a JPG or PNG image.',
            'declaration.accepted' => 'You must accept the applicant declaration.',
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
