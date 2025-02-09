<?php

namespace App\Http\Controllers;

use App\Events\SendChatMessage;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
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
        Log::debug($request);
        $messageRequest = $request->validate([
            'content' => ['required', 'string', 'max:1000'],
            'user_id' => ['required', 'integer'],
            'chatroom_id' => ['required', 'integer']
        ]);

        $message = Message::create([
            'content' => $messageRequest['content'],
            'user_id' => $messageRequest['user_id'],
            'chatroom_id' => $messageRequest['chatroom_id']
        ]);

        $message->load(['sender', 'chatroom']);

        broadcast(new SendChatMessage($message))->toOthers();

        return response([
            'message' => $message,
            'tempID' => request()->tempID
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
