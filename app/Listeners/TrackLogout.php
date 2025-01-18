<?php

namespace App\Listeners;

use App\Events\UpdateActiveUserList;
use App\Models\ActiveUser;
use Illuminate\Auth\Events\Logout;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class TrackLogout
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
    public function handle(Logout $event): void
    {
        ActiveUser::where('user_id', $event->user->id)->delete();

        UpdateActiveUserList::dispatch();
    }
}
