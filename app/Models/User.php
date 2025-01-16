<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'email',
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function messages(): HasMany {
        return $this->hasMany(Message::class);
    }

    public function chatrooms(): BelongsToMany {
        return $this->belongsToMany(Chatroom::class, 'chatroom_users', 'user_id', 'chatroom_id')->withTimestamps();
    }

    public function blocks(): BelongsToMany {
        return $this->belongsToMany(User::class, 'user_blocks', 'user_id', 'blocked_user_id')->withTimestamps();
    }

    public function blockedBy(): BelongsToMany {
        return $this->belongsToMany(User::class, 'user_blocks', 'blocked_user_id', 'user_id')->withTimestamps();
    }
}
