<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\models\Bank;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    /** @return array - array of currency with history*/
    public function getCurrencies() {
        // get data on currencies throughout the day
        $weekData = Bank::where('created_at', '>=', now()->subDays(1)->startOfDay())
            ->get();

        $currencies = [];

        // change the view of the array
        foreach ($weekData as $cur) {
            // for first iteration
            if(!$currencies) $currencies = [];
            if(!isset($currencies[$cur->currency])) $currencies[$cur->currency] = [];

            // add to array start data type of
            // {CURRENCY => {}[]}[]
            array_unshift(
                $currencies[$cur->currency],
                [
                    'currency' => $cur->currency,
                    'rate' => $cur->rate,
                    'id' => $cur->id,
                    'exchange' => $cur->exchange,
                    'created_at' => $cur->created_at,
                ]
            );

        }

        return $currencies;
    }
}
