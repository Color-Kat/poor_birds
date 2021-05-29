<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    //gn0g1d9v
    //gn0g1d9v
    private $merchant_id = '319484'; // merchant id from free kassa
    private $merchant_secret = 'gn0g1d9v'; // secret word

    /**
        return ip of free kassa
     */
    private function getIP() {
        if(isset($_SERVER['HTTP_X_REAL_IP'])) return $_SERVER['HTTP_X_REAL_IP'];
        return $_SERVER['REMOTE_ADDR'];
    }

    public function handler(Request $request) {
        Log::info('New payment');

        // check free kassa APIs
        if (!in_array($this->getIP(), array(
            '168.119.157.136',
            '168.119.60.227',
            '138.201.88.124',
            '136.243.38.147',
            '136.243.38.149',
            '136.243.38.150',
            '136.243.38.151',
            '136.243.38.189',
            '136.243.38.108',
        ))) {
            Log::warning("hacking attempt!");
            die("hacking attempt!");
        }

        // generate sign from merch_id and secret
        $sign = md5(
            $this->merchant_id.':'.$request->AMOUNT.':'.$this->merchant_secret.':'.$request->MERCHANT_ORDER_ID
        );

        // wrong sign (payment error)
        if ($sign != $request->SIGN){
            Log::warning("wrong sign");
            die('wrong sign');
        }

        $user_id = $request->us_user_id; // get email for pay
        $user = User::where('id', '=', $user_id)->first(); // find user by email
        $user->update(['donate' => $user->donate + $request->AMOUNT]); // update donate
    }
}
