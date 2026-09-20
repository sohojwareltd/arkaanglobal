<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class JobApplication extends Model
{
    /** @use HasFactory<\Database\Factories\JobApplicationFactory> */
    use HasFactory;

    protected $fillable = [
        'application_number',
        'job_posting_id',
        'name',
        'email',
        'date_of_birth',
        'nationality',
        'gender',
        'mobile',
        'current_country',
        'current_city',
        'address',
        'position_applied',
        'years_experience',
        'expected_salary',
        'availability',
        'preferred_location',
        'employment_preference',
        'passport_number',
        'passport_expiry',
        'visa_status',
        'available_to_join',
        'mobility_regions',
        'highest_qualification',
        'field_major',
        'institution',
        'year_completed',
        'recent_employer',
        'employer_country',
        'employer_position',
        'employment_history',
        'technical_skills',
        'other_skills',
        'certifications_notes',
        'lang_english',
        'lang_arabic',
        'lang_hindi',
        'lang_bengali',
        'other_language',
        'other_language_level',
        'cv_path',
        'cv_original_name',
        'photo_path',
        'photo_original_name',
        'declaration_accepted_at',
        'status',
        'admin_comments',
        'read_at',
        'ip_address',
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'passport_expiry' => 'date',
            'available_to_join' => 'date',
            'expected_salary' => 'decimal:2',
            'years_experience' => 'integer',
            'year_completed' => 'integer',
            'mobility_regions' => 'array',
            'technical_skills' => 'array',
            'declaration_accepted_at' => 'datetime',
            'read_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (JobApplication $application): void {
            if ($application->application_number === null) {
                $application->application_number = self::generateApplicationNumber();
            }
        });
    }

    public static function generateApplicationNumber(): string
    {
        $prefix = 'ARK-'.now()->format('Ymd');

        $latest = static::query()
            ->where('application_number', 'like', $prefix.'-%')
            ->orderByDesc('application_number')
            ->value('application_number');

        $sequence = 1;

        if ($latest !== null) {
            $sequence = (int) Str::afterLast($latest, '-') + 1;
        }

        return sprintf('%s-%04d', $prefix, $sequence);
    }

    public function jobPosting(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(JobApplicationAttachment::class);
    }
}
