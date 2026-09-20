<?php

use App\Models\JobApplication;
use App\Models\JobApplicationAttachment;
use App\Models\JobPosting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * @return array<string, mixed>
 */
function validInternationalApplicationPayload(int $jobPostingId, array $overrides = []): array
{
    return array_merge([
        'job_posting_id' => $jobPostingId,
        'full_name' => 'John Doe',
        'dob' => '1990-01-15',
        'nationality' => 'Indian',
        'gender' => 'Male',
        'mobile' => '+966501234567',
        'email' => 'john@example.com',
        'position' => 'Site Engineer',
        'experience' => 5,
        'declaration' => '1',
        'website' => '',
        'cv' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
    ], $overrides);
}

it('renders the careers page', function () {
    JobPosting::factory()->create([
        'title_en' => 'Site Engineer',
        'title_ar' => 'مهندس موقع',
        'is_active' => true,
        'application_deadline' => null,
    ]);

    $this->get('/careers')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Careers')
            ->has('jobs', 1));
});

it('renders the job detail page', function () {
    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->get("/careers/{$job->id}")
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('CareerJobDetail')
            ->where('job.id', $job->id));
});

it('renders the job application page', function () {
    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->get("/careers/{$job->id}/apply")
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('CareerApply')
            ->where('job.id', $job->id));
});

it('stores a valid job application with cv', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    $response = $this->post('/job-applications', validInternationalApplicationPayload($job->id));

    $response->assertRedirect(route('careers.apply', $job));
    $response->assertSessionHas('success', true);
    $response->assertSessionHas('application_number');

    $application = JobApplication::query()->first();

    expect($application)->not->toBeNull()
        ->and($application->name)->toBe('John Doe')
        ->and($application->email)->toBe('john@example.com')
        ->and($application->job_posting_id)->toBe($job->id)
        ->and($application->status)->toBe('new')
        ->and($application->application_number)->toStartWith('ARK-')
        ->and($application->position_applied)->toBe('Site Engineer')
        ->and($application->mobile)->toBe('+966501234567')
        ->and($application->declaration_accepted_at)->not->toBeNull();

    Storage::disk('local')->assertExists($application->cv_path);
});

it('stores additional attachments with a job application', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->post('/job-applications', validInternationalApplicationPayload($job->id, [
        'attachments' => [
            UploadedFile::fake()->create('passport.pdf', 100, 'application/pdf'),
            UploadedFile::fake()->image('certificate.jpg'),
        ],
        'attachment_labels' => ['Passport Copy', 'Certificate'],
    ]))->assertRedirect(route('careers.apply', $job));

    $application = JobApplication::query()->with('attachments')->first();

    expect($application->attachments)->toHaveCount(2);

    $application->attachments->each(function (JobApplicationAttachment $attachment): void {
        Storage::disk('local')->assertExists($attachment->file_path);
    });
});

it('rejects job applications with missing fields', function () {
    $this->post('/job-applications', [])
        ->assertSessionHasErrors([
            'job_posting_id',
            'full_name',
            'dob',
            'nationality',
            'gender',
            'mobile',
            'email',
            'position',
            'experience',
            'cv',
            'declaration',
        ]);
});

it('rejects duplicate applications within 24 hours', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    JobApplication::factory()->create([
        'job_posting_id' => $job->id,
        'email' => 'john@example.com',
        'created_at' => now(),
    ]);

    $this->post('/job-applications', validInternationalApplicationPayload($job->id))
        ->assertSessionHasErrors(['email']);
});

it('rejects honeypot submissions', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->post('/job-applications', validInternationalApplicationPayload($job->id, [
        'website' => 'https://spam.test',
    ]))->assertSessionHasErrors(['website']);
});

it('rejects applications for inactive jobs', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => false]);

    $this->post('/job-applications', validInternationalApplicationPayload($job->id))
        ->assertSessionHasErrors(['job_posting_id']);
});

it('rejects invalid cv file types', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->post('/job-applications', validInternationalApplicationPayload($job->id, [
        'cv' => UploadedFile::fake()->create('resume.exe', 100, 'application/octet-stream'),
    ]))->assertSessionHasErrors(['cv']);
});

it('rejects more than five additional attachments', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->post('/job-applications', validInternationalApplicationPayload($job->id, [
        'attachments' => [
            UploadedFile::fake()->create('doc1.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc2.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc3.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc4.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc5.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc6.pdf', 10, 'application/pdf'),
        ],
    ]))->assertSessionHasErrors(['attachments']);
});
