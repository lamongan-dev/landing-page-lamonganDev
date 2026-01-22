<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function () {
    return view('welcome');
});

Route::match(['GET','POST'], '/_boost/browser-logs', function (Request $request) {
    return response()->json(['ok' => true]);
})->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
