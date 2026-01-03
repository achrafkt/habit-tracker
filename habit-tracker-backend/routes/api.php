<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HabitController;
use App\Http\Controllers\Api\StatsController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Habits
    Route::apiResource('habits', HabitController::class);
    Route::post('/habits/{habit}/toggle', [HabitController::class, 'toggleCompletion']);
    
    // Stats
    Route::get('/stats/dashboard', [StatsController::class, 'dashboard']);
});
