<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class LeadersController extends Controller
{

    /**
     * get 5 users order by money
     */
    public function getLeaders()
    {
        $users = User::where('role', '=', 0)->orderBy('money', 'desc')->take(10)->select('name', 'money')->get();

        return $users;
    }
}
