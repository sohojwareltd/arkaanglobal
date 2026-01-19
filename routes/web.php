<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');

Route::get('/projects', function () {
    return Inertia::render('Projects');
})->name('projects');

Route::get('/clients', function () {
    return Inertia::render('Clients');
})->name('clients');

Route::get('/careers', function () {
    return Inertia::render('Careers');
})->name('careers');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// 404 fallback - must be last
Route::fallback(function () {
    return Inertia::render('NotFound');
});
