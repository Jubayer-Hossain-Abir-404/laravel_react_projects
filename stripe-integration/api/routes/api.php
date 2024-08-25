<?php

use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'App\Http\Controllers\Api\Auth', 'prefix' => 'v1'], function () {
    Route::post('/login', 'AuthController@login');
    Route::post('/logout', 'AuthController@logout')->middleware(['auth:sanctum']);
});

Route::middleware(['auth:sanctum'])
    ->prefix('v1')
    ->namespace('App\Http\Controllers\Api')
    ->group(function () {
        Route::post('/checkout/{plan}', 'PaymentController@checkout');
        Route::get('success', 'PaymentController@success')->name('checkout.success');
        Route::get('cancel', 'PaymentController@cancel')->name('checkout.cancel');
    });

Route::prefix('v1')
    ->namespace('App\Http\Controllers\Api')
    ->group(function () {
        Route::resource('plans', 'PlanController');;
    });
