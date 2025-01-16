<?php

use App\Models\Chatroom;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chatrooms', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create(("chatroom_users"), function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Chatroom::class)->constrained('chatrooms', 'id')->cascadeOnDelete();
            $table->foreignIdFor(User::class)->constrained('users', 'id')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['chatroom_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chatroom_users');
        Schema::dropIfExists('chatrooms');
    }
};
