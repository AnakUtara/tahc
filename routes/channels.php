<?php

use App\Broadcasting\UpdateLobby;
use App\Models\Chatroom;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel("active-users", function(User $user) {
        return $user->only('id', 'name');
});

Broadcast::channel('chatroom.{chatroomId}', function(User $user, $chatroomId) {
    $chatroom = Chatroom::find($chatroomId);
    if(!$chatroom) return false;
    return $chatroom && $chatroom->users->contains($user);
});
