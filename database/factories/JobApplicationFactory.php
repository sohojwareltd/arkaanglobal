<?php

namespace Database\Factories;

use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobApplication>
 */
class JobApplicationFactory extends Factory
{
    protected $model = JobApplication::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'job_posting_id' => JobPosting::factory(),
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'cv_path' => 'job-applications/sample.pdf',
            'cv_original_name' => 'cv.pdf',
            'status' => 'new',
            'ip_address' => fake()->ipv4(),
        ];
    }
}
