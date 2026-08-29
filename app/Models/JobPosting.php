<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobPosting extends Model
{
    /** @use HasFactory<\Database\Factories\JobPostingFactory> */
    use HasFactory;

    protected $fillable = [
        'title_en',
        'title_ar',
        'description_en',
        'description_ar',
        'location_en',
        'location_ar',
        'employment_type',
        'application_deadline',
        'order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'application_deadline' => 'date',
            'order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }

    public function isAcceptingApplications(): bool
    {
        if (! $this->is_active) {
            return false;
        }

        if ($this->application_deadline === null) {
            return true;
        }

        return $this->application_deadline->isFuture() || $this->application_deadline->isToday();
    }
}
