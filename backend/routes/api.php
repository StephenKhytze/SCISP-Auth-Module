<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\StudentRegistrationController;
use App\Http\Controllers\Home\DashboardController;
use App\Http\Controllers\Schedule\ScheduleController;
use App\Http\Controllers\Announcements\AnnouncementController;
use App\Http\Controllers\Library\LibraryController;
use App\Http\Controllers\StudentInfo\StudentController;
use App\Http\Controllers\Faculty\FacultyController;

Route::get('/test', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'API is working properly!'
    ]);
});

/*
|--------------------------------------------------------------------------
| Group 1: Auth & Home
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/register', [StudentRegistrationController::class, 'register']);
    Route::get('/registration-status', [StudentRegistrationController::class, 'status']);
    Route::post('/google', [GoogleAuthController::class, 'handleGoogleAuth']);
});

Route::middleware('auth.jwt')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/change-password', [AuthController::class, 'changePassword']);
    });

    Route::prefix('admin/registrations')->group(function () {
        Route::get('/', [StudentRegistrationController::class, 'index']);
        Route::get('/stats', [StudentRegistrationController::class, 'stats']);
        Route::get('/outbox', [StudentRegistrationController::class, 'outbox']);
        Route::post('/{id}/approve', [StudentRegistrationController::class, 'approve']);
        Route::post('/{id}/reject', [StudentRegistrationController::class, 'reject']);
    });

    Route::prefix('home')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index']);
        // Group 1: Add more home routes here
    });

    /*
    |--------------------------------------------------------------------------
    | Group 2: Schedule
    |--------------------------------------------------------------------------
    */
    Route::prefix('schedule')->group(function () {
        Route::get('/', [ScheduleController::class, 'index']);
        // Group 2: Add more schedule routes here
    });

    /*
    |--------------------------------------------------------------------------
    | Group 3: Announcements
    |--------------------------------------------------------------------------
    */
    Route::prefix('announcements')->group(function () {
        Route::get('/', [AnnouncementController::class, 'index']);
        // Group 3: Add more announcement routes here
    });

    /*
    |--------------------------------------------------------------------------
    | Group 4: Library
    |--------------------------------------------------------------------------
    */
    Route::prefix('library')->group(function () {
        Route::get('/', [LibraryController::class, 'index']);
        // Group 4: Add more library routes here
    });

    /*
    |--------------------------------------------------------------------------
    | Group 5: Student Info & Faculty Directory
    |--------------------------------------------------------------------------
    */
    Route::prefix('student-info')->group(function () {
        Route::get('/', [StudentController::class, 'index']);
        // Group 5: Add more student info routes here
    });

    Route::prefix('faculty')->group(function () {
        Route::get('/', [FacultyController::class, 'index']);
        // Group 5: Add more faculty routes here
    });
});
