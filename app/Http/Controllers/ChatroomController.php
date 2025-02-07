<?php

namespace App\Http\Controllers;

use App\Models\Chatroom;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ChatroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userA = Auth::user();
        $userB = User::findOrFail($request->user_id);

        $chatroom = Chatroom::findExistingByUsers($userA, $userB);

        if ($chatroom->exists()) {
            return $chatroom->with(['users', 'messages.sender'])->first();
        }

        try {
            $newChatroom = DB::transaction(function () use ($userA, $userB) {
                $ids = [$userA->id, $userB->id];
                sort($ids);
                $slug = 'chatroom-' . implode('-', $ids);
                return Chatroom::lockForUpdate()->firstOrCreate([
                    'slug' => Str::slug($slug),
                ]);
            });

            Chatroom::find($newChatroom->id)->users()->syncWithoutDetaching([$userA, $userB]);

            return $newChatroom->with(['users', 'messages.sender'])->first();
        } catch (\Throwable $th) {
            Log::error('Chatroom creation error: ' . $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatroom $chatroom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chatroom $chatroom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chatroom $chatroom)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chatroom $chatroom)
    {
        //
    }
}
