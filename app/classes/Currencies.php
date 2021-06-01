<?php


namespace App\classes;


class Currencies
{
    static function getCurrencies() {
        // rate for 1 USD = x RUB
        $usd = json_decode(file_get_contents('https://www.cbr-xml-daily.ru/daily_json.js'))->Valute->USD->Value;
        // rate for 1 BTC = x RUB
        $btc = json_decode(file_get_contents('https://blockchain.info/ru/ticker'))->RUB->last;
        // rate for 1 RUB = x GTN
        $rub = 1 / random_int(90, 120);
        // rate for 1 GTN = x real_RUB
        $gtn = random_int(85, 110) / 100;

        return [
            'USD' => round($usd, 2),
            'BTC' => round($btc),
            'RUB' => round($rub, 3),
            'GTN' => round($gtn, 2),
        ];
    }
}
