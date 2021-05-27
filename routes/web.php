<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

// for url cron jobs
Route::get('/cron/collect_eggs', function () {
    Artisan::call('collect:eggs');
    return 'Вы собрали яйца';
});

//store a push subscriber.
Route::post('/push','PushController@store');

//make a push notification.
Route::get('/push','PushController@push');


Route::post('/payment/result', function (Request $request){
    \Illuminate\Support\Facades\Log::info('wooork!');
    \Illuminate\Support\Facades\Log::info($request->all());
})->middleware(\App\Http\Middleware\FreeKassaVerifyCsrfToken::class);

Route::any('/{any}', function () {
    return view('index');
})->where('any', '.*');
