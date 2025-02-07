<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    /** @use HasFactory<\Database\Factories\MessageFactory> */
    use HasFactory;

    protected $fillable = [
        'chatroom_id',
        'user_id',
        'content'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function chatroom(): BelongsTo {
        return $this->belongsTo(Chatroom::class);
    }

    public function sender(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }
}
