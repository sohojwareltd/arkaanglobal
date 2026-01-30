<?php

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
use App\Models\ManpowerCategory;
use App\Models\Project;
use App\Models\Service;
use App\Models\Stat;
use App\Models\Testimonial;
use App\Models\WhyChooseUs;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $hero = HeroSection::where('page', 'home')->where('is_active', true)->first();
    $services = Service::where('is_active', true)->orderBy('order')->with('items')->get();
    $stats = Stat::where('is_active', true)->orderBy('order')->get();
    $aboutOverview = AboutContent::where('key', 'overview')->first();
    $vision = AboutContent::where('key', 'vision')->first();
    $mission = AboutContent::where('key', 'mission')->first();
    $clients = Client::where('is_active', true)->orderBy('order')->get();

    return Inertia::render('Home', [
        'hero' => $hero,
        'services' => $services,
        'stats' => $stats,
        'aboutOverview' => $aboutOverview,
        'vision' => $vision,
        'mission' => $mission,
        'clients' => $clients,
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
    $services = Service::where('is_active', true)->orderBy('order')->with('items')->get();
    $manpowerCategories = ManpowerCategory::where('is_active', true)->orderBy('order')->get();
    $cleaningScopes = CleaningServiceScope::where('is_active', true)->orderBy('order')->with('items')->get();
    $manpowerCategoriesTitle = HseContent::where('key', 'services_manpower_categories_title')->first();
    $cleaningMatrixTitle = HseContent::where('key', 'services_cleaning_matrix_title')->first();
    $manpowerFormLink = HseContent::where('key', 'manpower_form_link')->first();

    return Inertia::render('Services', [
        'hero' => $hero,
        'services' => $services,
        'manpowerCategories' => $manpowerCategories,
        'cleaningScopes' => $cleaningScopes,
        'manpowerCategoriesTitle' => $manpowerCategoriesTitle,
        'cleaningMatrixTitle' => $cleaningMatrixTitle,
        'manpowerFormLink' => $manpowerFormLink,
    ]);
})->name('services');

Route::post('/quote-request', [QuoteRequestController::class, 'store'])->name('quote-request.store');

Route::get('/hse-contact', function () {
    $hero = HeroSection::where('page', 'hse-contact')->where('is_active', true)->first();
    $hseCommitments = HseContent::where('key', 'commitments')->get();
    $hsePolicyLink = HseContent::where('key', 'policy_link')->first();
    $clientCategories = ClientCategory::where('is_active', true)->orderBy('order')->get();
    $whyChooseUs = WhyChooseUs::where('is_active', true)->orderBy('order')->get();

    return Inertia::render('HSEContact', [
        'hero' => $hero,
        'hseCommitments' => $hseCommitments,
        'hsePolicyLink' => $hsePolicyLink,
        'clientCategories' => $clientCategories,
        'whyChooseUs' => $whyChooseUs,
    ]);
})->name('hse-contact');

Route::get('/clients', function () {
    $hero = HeroSection::where('page', 'clients')->where('is_active', true)->first();
    $clients = Client::where('is_active', true)->orderBy('order')->get();
    $testimonials = Testimonial::where('is_active', true)->orderBy('order')->with('client')->get();

    return Inertia::render('Clients', [
        'hero' => $hero,
        'clients' => $clients,
        'testimonials' => $testimonials,
    ]);
})->name('clients');

Route::get('/projects', function () {
    $hero = HeroSection::where('page', 'projects')->where('is_active', true)->first();
    $projects = Project::where('is_active', true)
        ->orderBy('order')
        ->with(['client', 'galleryItems'])
        ->get();

    return Inertia::render('Projects', [
        'hero' => $hero,
        'projects' => $projects,
    ]);
})->name('projects');

Route::get('/projects/{project}', function (Project $project) {
    if (! $project->is_active) {
        abort(404);
    }

    $project->load(['client', 'galleryItems']);

    $projectData = $project->toArray();
    // Ensure gallery_items is always an array (Laravel uses snake_case in toArray)
    $projectData['gallery_items'] = $projectData['gallery_items'] ?? [];
    $projectData['galleryItems'] = $projectData['gallery_items'];

    return Inertia::render('ProjectDetail', [
        'project' => $projectData,
    ]);
})->whereNumber('project')->name('projects.show');

// Language switching
Route::get('/language/{code}', [LanguageController::class, 'switch'])->name('language.switch');

// 404 fallback - must be last
Route::fallback(function () {
    return Inertia::render('NotFound');
});
