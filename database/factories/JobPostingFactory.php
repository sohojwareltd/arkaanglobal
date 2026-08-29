<?php

namespace Database\Factories;

use App\Models\JobPosting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobPosting>
 */
class JobPostingFactory extends Factory
{
    protected $model = JobPosting::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title_en' => fake()->jobTitle(),
            'title_ar' => 'مهندس '.fake()->word(),
            'description_en' => '<p>'.fake()->paragraph().'</p>',
            'description_ar' => '<p>'.fake()->paragraph().'</p>',
            'location_en' => 'Riyadh, Saudi Arabia',
            'location_ar' => 'الرياض، المملكة العربية السعودية',
            'employment_type' => fake()->randomElement(['full-time', 'contract', 'temporary']),
            'application_deadline' => fake()->optional()->dateTimeBetween('+1 week', '+3 months'),
            'order' => fake()->numberBetween(0, 10),
            'is_active' => true,
        ];
    }
}
