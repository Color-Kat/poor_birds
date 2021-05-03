<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

//Route::get('/{any}', function () {
//    return view('index');
//})->where('any', '.*');

// for url cron jobs on ifinityfree
Route::get('/cron/collect_eggs', function () {
    Artisan::call('collect:eggs');
    return 'Вы собрали яйца';
});

//Route::get('/service-worker.js', function () {
////    return 123;
//});

Route::any('/{any}', function () {
    return view('index');
})->where('any', '.*');

//Route::any( '/{any}/{any?}', function(){
//    return view('index');
//})->where('any', '.*');
