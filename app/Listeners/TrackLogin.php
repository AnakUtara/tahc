<?php

namespace App\Listeners;

use App\Events\UpdateActiveUserList;
use App\Models\ActiveUser;
use Exception;
use Illuminate\Auth\Events\Login;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class TrackLogin
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        try {
            Auth::logoutOtherDevices(request('password'));
            Log::info("User {$event->user->id} logged in, invalidated other sessions.");
        } catch (\Exception $e) {
            Log::error("Error invalidating other sessions for user {$event->user->id}: " . $e->getMessage());
        }
    }
}
