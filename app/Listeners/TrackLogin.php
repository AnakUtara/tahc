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
        $activeUser = ActiveUser::where('user_id', $event->user->id)->first();

        if ($activeUser) {
            try {
                Auth::logoutOtherDevices(request('password'));
                Log::info("User {$event->user->id} logged in, invalidated other sessions.");
            } catch (\Exception $e) {
                Log::error("Error invalidating other sessions for user {$event->user->id}: " . $e->getMessage());
            }
            $activeUser->update([
                'last_seen_at' => now(),
                'device' => request()->userAgent(),
                'ip_address' => request()->ip(),
            ]);
        } else {
            ActiveUser::create([
                'user_id' => $event->user->id,
                'ip_address' => request()->ip(),
                'device' => request()->userAgent(),
                'last_seen_at' => now(),
            ]);
        }

        UpdateActiveUserList::dispatch();
    }
}
