<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

// for url cron jobs
Route::get('/cron/collect_eggs', function () {
    Artisan::call('collect:eggs');
    return 'Вы собрали яйца';
});

//store a push subscriber.
Route::post('/push','PushController@store');

//make a push notification.
Route::get('/push','PushController@push');

Route::post('/currency/result', 'PaymentController@handler')
    ->middleware(\App\Http\Middleware\FreeKassaVerifyCsrfToken::class);

Route::any('/{any}', function () {
    return view('index');
    return File::get(public_path() . '/prerender/birds/index.html');
})->where('any', '.*');
