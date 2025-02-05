<?php

use App\Http\Controllers\CarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Monolog\Handler\RotatingFileHandler;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Your API routes go here
Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
// Route::post('register', '\App\Http\Controllers\AuthController@register');
// Route::post('forgot_password', 'App\Http\Controllers\AuthController@forgot_password');
// Route::delete('user_deactivate',[App\Http\Controllers\AuthController::class, 'register'])
Route::get('image_list', [\App\Http\Controllers\CarController::class, 'image_list']);
Route::get('image_motorcyle', [\App\Http\Controllers\CarController::class, 'image_motorcyle']);

Route::middleware('auth:api')->group(function () {
    // UserController

    Route::apiResource('users', App\Http\Controllers\UserController::class);
    Route::get('active_Users', [\App\Http\Controllers\UserController::class, 'active_Users']);

    Route::apiResource('profile', App\Http\Controllers\ProfileController::class);
    Route::apiResource('cars', App\Http\Controllers\CarController::class);

    Route::apiResource('booking', App\Http\Controllers\CarBookingController::class);
    Route::get('bookings', [\App\Http\Controllers\CarBookingController::class, 'bookings']);
    Route::get('reserved', [\App\Http\Controllers\CarBookingController::class, 'reserved']);
    Route::get('bookedPerMonth', [\App\Http\Controllers\CarBookingController::class, 'bookedPerMonth']);
    Route::get('getNotification', [\App\Http\Controllers\CarBookingController::class, 'getNotification']);

    Route::post('delete_list', [App\Http\Controllers\UserController::class, 'delete_list']);
    Route::post('add_car_list', [\App\Http\Controllers\CarController::class, 'add_car_list']);
    Route::post('delete_car_list', [\App\Http\Controllers\CarController::class, 'delete_car_list']);

    Route::post('approve_car_reserved', [\App\Http\Controllers\CarBookingController::class, 'update']);
    Route::post('approve_car_returned', [\App\Http\Controllers\CarBookingController::class, 'update']);
    Route::post('delete_car_reserved', [\App\Http\Controllers\CarBookingController::class, 'destroy']);

    // END UserController

});
