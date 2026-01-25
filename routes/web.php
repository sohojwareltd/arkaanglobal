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

Route::get('/hse-contact', function () {
    return Inertia::render('HSEContact');
})->name('hse-contact');

// 404 fallback - must be last
Route::fallback(function () {
    return Inertia::render('NotFound');
});
