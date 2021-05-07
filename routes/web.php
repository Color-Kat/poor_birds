<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

//Route::get('/{any}', function () {
//    return view('index');
//})->where('any', '.*');

// for url cron jobs
//Route::get('/cron/collect_eggs', function () {
//    Artisan::call('collect:eggs');
//    return 'Вы собрали яйца';
//});

//store a push subscriber.
Route::post('/push','PushController@store');

Route::any('/{any}', function () {
    return view('index');
})->where('any', '.*');

//Route::any( '/{any}/{any?}', function(){
//    return view('index');
//})->where('any', '.*');
