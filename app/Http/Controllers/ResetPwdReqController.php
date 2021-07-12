<?php
namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

use Carbon\Carbon;
use App\Mail\SendMail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class ResetPwdReqController extends Controller
{
    public function reqForgotPassword(Request $request){
        if(!$this->validEmail($request->email)) {
            return response()->json([
                'success' => false,
                'message' => 'Пользователь не найден.'
            ], Response::HTTP_NOT_FOUND);
        } else {
            $this->sendEmail($request->email);
            return response()->json([
                'success' => true,
                'message' => 'Письмо с ссылкой для восстановления пароля было отправлена на ваш email.'
            ], Response::HTTP_OK);
        }
    }

    /**
     * create reset token and send mail with it
     */
    public function sendEmail($email){
        $token = $this->createToken($email);
        Mail::to($email)->send(new SendMail($token));
    }

    public function validEmail($email) {
        return !!User::where('email', $email)->first();
    }

    /**
     * create reset token
     */
    public function createToken($email){
        $isToken = DB::table('password_resets')->where('email', $email)->first();

        if($isToken) {
            return $isToken->token;
        }

        $token = Str::random(80);;
        $this->saveToken($token, $email);
        return $token;
    }

    /**
     * Insert reset token to table
     * */
    public function saveToken($token, $email){
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }
}
