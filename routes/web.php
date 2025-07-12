<?php

use App\Http\Controllers\ActiveUserController;
use App\Http\Controllers\ChatroomController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Auth::check() ? redirect()->route('login') : redirect()->route('dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard', [
            'authUser' => Auth::user(),
        ]);
    })->name('dashboard');
    Route::resources([
        'chatrooms' => ChatroomController::class,
        'messages' => MessageController::class
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
