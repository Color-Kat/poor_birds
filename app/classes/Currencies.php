<?php


namespace App\classes;


class Currencies
{
    /**
     * @return array - USD, BTC, RUB, GTN rate
     */
    static function getCurrencies(): array
    {
        // rate for 1 USD = x RUB
        $usd = json_decode(file_get_contents('https://quotes.instaforex.com/api/quotesTick?q=usdrub'))[0]->ask;
        // rate for 1 BTC = x RUB
        $btc = json_decode(file_get_contents('https://blockchain.info/ru/ticker'))->RUB->last;
        // rate for 1 RUB = x GTN
        $rub = 1 / random_int(85, 130);
        // rate for 1 GTN = x real_RUB
        $gtn = random_int(85, 110) / 100;

        return [
            'USD' => [
                'currency' => 'USD',
                'rate' => round($usd, 2),
                'exchange' => 'RUB'
            ],
            'BTC' => [
                'currency' => 'BTC',
                'rate' => round($btc),
                'exchange' => 'RUB'
            ],
            'RUB' => [
                'currency' => 'RUB',
                'rate' => round($rub, 3),
                'exchange' => 'GTN'
            ],
            'GTN' => [
                'currency' => 'GTN',
                'rate' => round($gtn, 2),
                'exchange' => 'real_RUB'
            ],
        ];
    }

    /**
     * @return float - returns the amount of currency that can be bought for $ amount
     */
    static function transaction($type, $amount, $currency, $exchange, $rate): float
    {
        if ($type == 'buy') {
            if($exchange == 'GTN') return round($amount / $rate, 2); // to buy GTN for RUB
            else if($currency == 'USD') return round($amount /$rate, 2); // to buy USD for RUB
            else if($currency == 'BTC') return number_format($amount / $rate, 9); // to buy BTC for RUB
            else return false;
        }
        else if ($type == 'sell') {
            if($currency == 'USD') return round($amount * $rate, 2);
            else if($currency == 'BTC') return round($amount * $rate, 2);
            else return false;
        }
    }
}
