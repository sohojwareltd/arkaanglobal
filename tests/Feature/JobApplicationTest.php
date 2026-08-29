<?php

use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

it('renders the careers page', function () {
    JobPosting::factory()->create([
        'title_en' => 'Site Engineer',
        'title_ar' => 'مهندس موقع',
        'is_active' => true,
    ]);

    $this->get('/careers')
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('Careers')
            ->has('jobs', 1));
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

    $response->assertRedirect();
    $response->assertSessionHas('success', true);

    $application = JobApplication::query()->first();

    expect($application)->not->toBeNull()
        ->and($application->name)->toBe('John Doe')
        ->and($application->email)->toBe('john@example.com')
        ->and($application->job_posting_id)->toBe($job->id)
        ->and($application->status)->toBe('new');

    Storage::disk('local')->assertExists($application->cv_path);
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
