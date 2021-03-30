<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('birds', 'api\BirdsController');

//Route::group([
//
//    'prefix'     => 'auth',
//    'namespace'  => 'Auth'
//
//], function ($router) {
//
//    Route::post('login', 'LoginController')->name('login');
//    Route::post('logout', 'LogoutController')->name('logout');
//
//    Route::get('account', 'AccountController')->name('account');
//});



Route::group([

    'middleware' => 'api',
    'prefix'     => 'auth',

], function ($router) {

    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login')->name('login');
    Route::get('logout', 'AuthController@logout');
    Route::get('user', 'AuthController@user');
    Route::get('check_auth', 'AuthController@checkAuth');

});

