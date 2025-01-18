<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActiveUser extends Model
{
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'user_id',
        'last_seen_at',
        'ip_address',
        'device'
    ];

    protected $hidden = [
        'ip_address',
        'device'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
