<?php

use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\QuoteRequestController;
use App\Models\AboutContent;
use App\Models\Certificate;
use App\Models\CleaningServiceScope;
use App\Models\Client;
use App\Models\ClientCategory;
use App\Models\CoreValue;
use App\Models\HeroSection;
use App\Models\HseContent;
use App\Models\JobPosting;
use App\Models\ManpowerCategory;
use App\Models\Project;
use App\Models\Service;
use App\Models\WhyChooseUs;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $hero = HeroSection::where('page', 'home')->where('is_active', true)->first();
    $services = Service::where('is_active', true)->orderBy('order')->with('items')->get();
    $projects = Project::where('is_active', true)->orderBy('order')->limit(12)->get();
    $whyChooseUs = WhyChooseUs::where('is_active', true)->orderBy('order')->get();
    $clients = Client::where('is_active', true)->orderBy('order')->get();
    $clientCategories = ClientCategory::where('is_active', true)->orderBy('order')->get();

    return Inertia::render('Home', [
        'hero' => $hero,
        'services' => $services,
        'projects' => $projects,
        'whyChooseUs' => $whyChooseUs,
        'clients' => $clients,
        'clientCategories' => $clientCategories,
    ]);
})->name('home');

Route::get('/about', function () {
    $hero = HeroSection::where('page', 'about')->where('is_active', true)->first();
    $aboutOverview = AboutContent::where('key', 'overview')->first();
    $vision = AboutContent::where('key', 'vision')->first();
    $mission = AboutContent::where('key', 'mission')->first();
    $coreValues = CoreValue::where('is_active', true)->orderBy('order')->get();
    $certificates = Certificate::where('is_active', true)->orderBy('order')->get();

    return Inertia::render('About', [
        'hero' => $hero,
        'aboutOverview' => $aboutOverview,
        'vision' => $vision,
        'mission' => $mission,
        'coreValues' => $coreValues,
        'certificates' => $certificates,
    ]);
})->name('about');

Route::get('/services', function () {
    $hero = HeroSection::where('page', 'services')->where('is_active', true)->first();
    // Only the summary is needed here — full item lists, the manpower
    // deployment table, and the cleaning scope matrix live on each
    // service's own detail page (see /services/{service:slug} below).
    $services = Service::where('is_active', true)->orderBy('order')->with('items')->get();

    return Inertia::render('Services', [
        'hero' => $hero,
        'services' => $services,
    ]);
})->name('services');

Route::get('/services/{service:slug}', function (Service $service) {
    if (! $service->is_active) {
        abort(404);
    }

    $service->load('items');
    $allServices = Service::where('is_active', true)->orderBy('order')->get();
    $manpowerCategories = $service->slug === 'manpower'
        ? ManpowerCategory::where('is_active', true)->orderBy('order')->get()
        : collect();
    $cleaningScopes = $service->slug === 'cleaning'
        ? CleaningServiceScope::where('is_active', true)->orderBy('order')->with('items')->get()
        : collect();
    $manpowerCategoriesTitle = HseContent::where('key', 'services_manpower_categories_title')->first();
    $cleaningMatrixTitle = HseContent::where('key', 'services_cleaning_matrix_title')->first();
    $manpowerFormLink = HseContent::where('key', 'manpower_form_link')->first();

    return Inertia::render('ServiceDetail', [
        'service' => $service,
        'allServices' => $allServices,
        'manpowerCategories' => $manpowerCategories,
        'cleaningScopes' => $cleaningScopes,
        'manpowerCategoriesTitle' => $manpowerCategoriesTitle,
        'cleaningMatrixTitle' => $cleaningMatrixTitle,
        'manpowerFormLink' => $manpowerFormLink,
    ]);
})->name('services.show');

Route::post('/quote-request', [QuoteRequestController::class, 'store'])->name('quote-request.store');

Route::post('/job-applications', [JobApplicationController::class, 'store'])
    ->middleware('throttle:5,10')
    ->name('job-applications.store');

Route::get('/careers', function () {
    $hero = HeroSection::where('page', 'careers')->where('is_active', true)->first();
    $jobs = JobPosting::query()
        ->where('is_active', true)
        ->orderBy('order')
        ->get()
        ->filter(fn (JobPosting $job): bool => $job->isAcceptingApplications())
        ->values();

    return Inertia::render('Careers', [
        'hero' => $hero,
        'jobs' => $jobs,
    ]);
})->name('careers');

Route::get('/hse-contact', function () {
    $hero = HeroSection::where('page', 'hse-contact')->where('is_active', true)->first();
    $hseCommitments = HseContent::where('key', 'commitments')->get();
    $hsePolicyLink = HseContent::where('key', 'policy_link')->first();
    $clientCategories = ClientCategory::where('is_active', true)->orderBy('order')->get();
    $whyChooseUs = WhyChooseUs::where('is_active', true)->orderBy('order')->get();
    $services = Service::where('is_active', true)->orderBy('order')->get();

    return Inertia::render('HSEContact', [
        'hero' => $hero,
        'hseCommitments' => $hseCommitments,
        'hsePolicyLink' => $hsePolicyLink,
        'clientCategories' => $clientCategories,
        'whyChooseUs' => $whyChooseUs,
        'services' => $services,
    ]);
})->name('hse-contact');

Route::get('/clients', function () {
    $hero = HeroSection::where('page', 'clients')->where('is_active', true)->first();
    // The profile names sector categories, not specific client companies, so
    // categories cover the sector breakdown; the clients table (managed in
    // the admin) supplies the actual named companies shown alongside them.
    $clientCategories = ClientCategory::where('is_active', true)->orderBy('order')->get();
    $clients = Client::where('is_active', true)->orderBy('order')->get();

    return Inertia::render('Clients', [
        'hero' => $hero,
        'clientCategories' => $clientCategories,
        'clients' => $clients,
    ]);
})->name('clients');

Route::get('/projects', function () {
    $hero = HeroSection::where('page', 'projects')->where('is_active', true)->first();
    $projects = Project::where('is_active', true)
        ->orderBy('order')
        ->with(['client', 'galleryItems'])
        ->get();
    $services = Service::where('is_active', true)->orderBy('order')->get();

    return Inertia::render('Projects', [
        'hero' => $hero,
        'projects' => $projects,
        'services' => $services,
    ]);
})->name('projects');

Route::get('/projects/{project}', function (Project $project) {
    if (! $project->is_active) {
        abort(404);
    }

    $project->load(['client', 'galleryItems']);

    $relatedProjects = Project::query()
        ->where('is_active', true)
        ->where('id', '!=', $project->id)
        ->where('category', $project->category)
        ->orderBy('order')
        ->limit(3)
        ->get();

    $projectData = $project->toArray();
    $projectData['gallery_items'] = $projectData['gallery_items'] ?? [];
    $projectData['galleryItems'] = $projectData['gallery_items'];

    return Inertia::render('ProjectDetail', [
        'project' => $projectData,
        'relatedProjects' => $relatedProjects,
    ]);
})->whereNumber('project')->name('projects.show');

// Language switching
Route::get('/language/{code}', [LanguageController::class, 'switch'])->name('language.switch');

// 404 fallback - must be last
Route::fallback(function () {
    return Inertia::render('NotFound');
});
