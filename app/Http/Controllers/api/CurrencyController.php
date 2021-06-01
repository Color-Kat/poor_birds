<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\models\Bank;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
//    private $usdApiKey = '46e79fcd6a6d04370cbff5bca62e0a6f';
//    private $btcApiKey = '';

    public function getCurrencies() {
//        $usd = json_decode(file_get_contents('https://www.cbr-xml-daily.ru/daily_json.js'))->Valute->USD->Value;
//        $btc = json_decode(file_get_contents('https://blockchain.info/ru/ticker'))->RUB->last;

//        dump($usd);
//        dump($btc);

        // get data on currencies throughout the day
        $weekData = Bank::where('created_at', '>=', now()->subDays(1)->startOfDay())->orderBy('created_at', 'desc')
            ->get();
        return $weekData;
    }
}
