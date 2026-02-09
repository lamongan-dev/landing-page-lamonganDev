<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\EventPublicController;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function () {
    return view('welcome');
});

Route::get('/event', function () {
    return view('welcome');
});
Route::get('/event/{slug}', function () {
    return view('welcome');
});

Route::match(['GET','POST'], '/_boost/browser-logs', function (Request $request) {
    return response()->json(['ok' => true]);
})->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);

Route::get('/api/events', [EventPublicController::class, 'index'])->name('events.public');
Route::get('/api/events/{slug}', [EventPublicController::class, 'show'])->name('events.public.show');

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
});

Route::middleware(['auth'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('events', EventController::class);
        Route::post('events/{event}', [EventController::class, 'update'])
            ->name('events.update.post');
    });
