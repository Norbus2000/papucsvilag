<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');


Route::get('/products', function () {
    return Inertia::render('Products');
})->name('products');

Route::get('/admin', ['middleware' => 'admin', function () {
    return Inertia::render('Admin');
}])->name('admin');






Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
});

Route::get('/greeting/{locale}', function (string $locale) {
    if (!in_array($locale, ['hu', 'en'])) {
        abort(400);
    }
    App::setLocale($locale);
});
