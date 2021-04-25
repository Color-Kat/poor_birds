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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::apiResource('birds', 'api\BirdController');
Route::apiResource('sellers', 'api\SellerController');
//Route::get('sellers/getBird', 'api\SellerController@getBird');
Route::apiResource('certificates', 'api\CertificateController');

Route::group([

    'middleware' => 'api',
    'prefix'     => 'auth',

], function ($router) {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login')->name('login');
    Route::get('logout', 'AuthController@logout');

    Route::get('user', 'AuthController@user');
    Route::get('check_auth', 'AuthController@checkAuth');
    Route::get('get_user_birds', 'AuthController@get_user_birds');
    Route::get('get_my_birds_with_certificate', 'AuthController@get_my_birds_with_certificate');

    Route::get('get_my_eggs', 'AuthController@get_my_eggs');
    Route::post('sellEggs', 'AuthController@sellEggs');
    Route::post('clean', 'AuthController@clean');

    Route::post('buyBird', 'AuthController@buyBird');
    Route::post('sellBird', 'AuthController@sellBird');
    Route::post('cares', 'AuthController@cares');

    Route::post('openSeller', 'AuthController@openSeller');
//    Route::get('get_user_birds', 'AuthController@get_user_birds_with_certificate');
});
