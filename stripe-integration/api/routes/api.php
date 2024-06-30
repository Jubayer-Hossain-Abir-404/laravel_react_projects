<?php

use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'App\Http\Controllers\Api', 'prefix' => 'v1'], function () {
    Route::group(['namespace' => 'Auth'], function () {
        Route::post('/login', 'AuthController@login');
        Route::post('/logout', 'AuthController@logout')->middleware(['auth:sanctum']);
    });
});

// Route::middleware(['auth:sanctum'])
//     ->prefix('v1')
//     ->namespace('App\Http\Controllers\Api')
//     ->group(function () {
//         Route::resource('plans', 'PlanController');
//         Route::post('/checkout/{id}', 'PaymentController@checkout');
//     });

Route::prefix('v1')
    ->namespace('App\Http\Controllers\Api')
    ->group(function () {
        Route::resource('plans', 'PlanController');
        Route::post('/checkout/{id}', 'PaymentController@checkout');
    });
