<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

use App\User;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ResetPasswordRequest;
use Symfony\Component\HttpFoundation\Response;


class UpdatePwdController extends Controller
{

    public function updatePassword(ResetPasswordRequest $request){
        return $this->validateToken($request)->count() > 0 ? $this->changePassword($request) : $this->noToken();
    }

    private function validateToken($request){
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->passwordToken
        ]);
    }

    private function noToken() {
        return response()->json([
            'error' => 'Такой почты или токена не существует!'
        ],Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    private function changePassword($request) {
        $user = User::where('email', '=', $request->email)->first();

        $user->update([
            'password'=>bcrypt($request->password)
        ]);

        $this->validateToken($request)->delete();

        return response()->json([
            'success' => 'Пароль успешно изменён!'
        ],Response::HTTP_CREATED);
    }
}
