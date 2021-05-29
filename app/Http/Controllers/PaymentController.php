<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    private $merchant_id = '319484';
    private $merchant_secret = 'g7cphs69';

    private function getIP() {
        if(isset($_SERVER['HTTP_X_REAL_IP'])) return $_SERVER['HTTP_X_REAL_IP'];
        return $_SERVER['REMOTE_ADDR'];
    }

    public function handler(Request $request) {
        // check free kassa APIs
        if (!in_array($this->getIP(), array('168.119.157.136', '168.119.60.227', '138.201.88.124'))) {
            die("hacking attempt!");
            Log::warning("hacking attempt!");
        }

        $sign = md5($this->merchant_id.':'.$request->AMOUNT.':'.$this->merchant_secret.':'
        .$request->MERCHANT_ORDER_ID);

        if ($sign != $request->SIGN){
            die('wrong sign');
            Log::warning("wrong sign");
        }

        Log::info(123);
        Log::info($request->all());
    }
}
