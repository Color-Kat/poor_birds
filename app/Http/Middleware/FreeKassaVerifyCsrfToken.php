<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Support\Facades\Log;

class FreeKassaVerifyCsrfToken extends Middleware
{

    private $whiteList = [
        '136.243.38.147',
        '136.243.38.149',
        '136.243.38.150',
        '136.243.38.151',
        '136.243.38.189',
        '136.243.38.108',
        '168.119.157.136',
        '168.119.60.227',
        '138.201.88.124',
//        '127.0.0.1'
    ];

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        Log::info('handler payment');
        if (!in_array($request->ip(), $this->whiteList)) {
            abort(403);
        }
        return $next($request);
    }
}
