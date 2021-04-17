<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __invoke(Request $request)
    {
        if (!$token = auth()->attempt($request->only('email', 'password'))) {
//            return response(null, 401);
//        }
//        return response()->json(compact('token'));
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([compact('token')], 200);
    }
}
