<?php

namespace App\Http\Middleware;

use App\Models\ActiveUser;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UpdateLastActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check()){
            ActiveUser::where('user_id', Auth::user()->id)->update(['last_seen_at' => now()]);
        }
        return $next($request);
    }
}
