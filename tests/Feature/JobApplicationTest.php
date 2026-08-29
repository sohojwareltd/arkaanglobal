<?php

use App\Models\JobApplication;
use App\Models\JobApplicationAttachment;
use App\Models\JobPosting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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

    $response = $this->post('/job-applications', [
        'job_posting_id' => $job->id,
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'cv' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
        'website' => '',
    ]);

    $response->assertRedirect(route('careers.apply', $job));
    $response->assertSessionHas('success', true);

    $application = JobApplication::query()->first();

    expect($application)->not->toBeNull()
        ->and($application->name)->toBe('John Doe')
        ->and($application->email)->toBe('john@example.com')
        ->and($application->job_posting_id)->toBe($job->id)
        ->and($application->status)->toBe('new');

    Storage::disk('local')->assertExists($application->cv_path);
});

it('stores additional attachments with a job application', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->post('/job-applications', [
        'job_posting_id' => $job->id,
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'cv' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
        'attachments' => [
            UploadedFile::fake()->create('passport.pdf', 100, 'application/pdf'),
            UploadedFile::fake()->image('certificate.jpg'),
        ],
        'attachment_labels' => ['Passport Copy', 'Certificate'],
    ])->assertRedirect(route('careers.apply', $job));

    $application = JobApplication::query()->with('attachments')->first();

    expect($application->attachments)->toHaveCount(2);

    $application->attachments->each(function (JobApplicationAttachment $attachment): void {
        Storage::disk('local')->assertExists($attachment->file_path);
    });
});

it('rejects job applications with missing fields', function () {
    $this->post('/job-applications', [])
        ->assertSessionHasErrors(['job_posting_id', 'name', 'email', 'cv']);
});

it('rejects duplicate applications within 24 hours', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    JobApplication::factory()->create([
        'job_posting_id' => $job->id,
        'email' => 'john@example.com',
        'created_at' => now(),
    ]);

    $this->post('/job-applications', [
        'job_posting_id' => $job->id,
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'cv' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
    ])->assertSessionHasErrors(['email']);
});

it('rejects honeypot submissions', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->post('/job-applications', [
        'job_posting_id' => $job->id,
        'name' => 'Bot User',
        'email' => 'bot@example.com',
        'cv' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
        'website' => 'https://spam.test',
    ])->assertSessionHasErrors(['website']);
});

it('rejects applications for inactive jobs', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => false]);

    $this->post('/job-applications', [
        'job_posting_id' => $job->id,
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'cv' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
    ])->assertSessionHasErrors(['job_posting_id']);
});

it('rejects invalid cv file types', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->post('/job-applications', [
        'job_posting_id' => $job->id,
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'cv' => UploadedFile::fake()->create('resume.exe', 100, 'application/octet-stream'),
    ])->assertSessionHasErrors(['cv']);
});

it('rejects more than five additional attachments', function () {
    Storage::fake('local');

    $job = JobPosting::factory()->create(['is_active' => true]);

    $this->post('/job-applications', [
        'job_posting_id' => $job->id,
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'cv' => UploadedFile::fake()->create('resume.pdf', 100, 'application/pdf'),
        'attachments' => [
            UploadedFile::fake()->create('doc1.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc2.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc3.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc4.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc5.pdf', 10, 'application/pdf'),
            UploadedFile::fake()->create('doc6.pdf', 10, 'application/pdf'),
        ],
    ])->assertSessionHasErrors(['attachments']);
});
