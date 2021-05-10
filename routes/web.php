<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

//Route::get('/{any}', function () {
//    return view('index');
//})->where('any', '.*');

// for url cron jobs
Route::get('/cron/collect_eggs', function () {
    Artisan::call('collect:eggs');
    return 'Вы собрали яйца';
});

//store a push subscriber.
Route::post('/push','PushController@store');

//make a push notification.
Route::get('/push','PushController@push');

Route::any('/{any}', function () {
    return view('index');
})->where('any', '.*');

//Route::any( '/{any}/{any?}', function(){
//    return view('index');
//})->where('any', '.*');
