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
Route::apiResource('certificates', 'api\CertificateController');
Route::apiResource('shovels', 'api\ShovelController');
Route::apiResource('contracts', 'api\ContractController');

Route::get('currencies', 'api\CurrencyController@getCurrencies');

Route::group([

    'middleware' => 'api',
    'prefix'     => 'auth',

], function ($router) {
    /* user auth */
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login')->name('login');
    Route::get('logout', 'AuthController@logout');

    /* user */
    Route::get('user', 'AuthController@user');
    Route::get('check_auth', 'AuthController@checkAuth');

    /* user - eggs */
    Route::get('get_my_eggs', 'AuthController@get_my_eggs');
    Route::post('sellEggs', 'AuthController@sellEggs');
    Route::post('clean', 'AuthController@clean');

    /* user - birds */
    Route::get('get_user_birds', 'AuthController@get_user_birds');
    Route::get('get_my_birds_with_certificate', 'AuthController@get_my_birds_with_certificate');
    Route::post('buyBird', 'AuthController@buyBird');
    Route::post('sellBird', 'AuthController@sellBird');
    Route::post('cares', 'AuthController@cares');

    /* user - certificates */
    Route::post('buyCertificate', 'AuthController@buyCertificate');

    /* user - sellers */
    Route::post('openSeller', 'AuthController@openSeller');

    /* user - shovels */
    Route::post('buyShovel', 'AuthController@buyShovel');
    Route::post('selectShovel', 'AuthController@selectShovel');

    /* user - contracts */
    Route::post('buyContract', 'AuthController@buyContract');

    /* user - fines */
    Route::get('payOffFines', 'AuthController@payOffFines');

    /* user - brigade */
    Route::get('brigadeHire', 'AuthController@brigadeHire');

    /* user - mine */
    Route::post('mine', 'AuthController@mine');
});
