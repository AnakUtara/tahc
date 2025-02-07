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
        Schema::table('messages', function (Blueprint $table) {
            $table->dropForeign(['chatroom_id']);
            $table->dropForeign(['user_id']);

            // Now, drop the composite unique index.
            $table->dropUnique(['chatroom_id', 'user_id']);

            // Optionally, re-add the foreign key constraints.
            $table->foreign('chatroom_id')->references('id')->on('chatrooms')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('messages', function (Blueprint $table) {
            // Drop the foreign keys again
            $table->dropForeign(['chatroom_id']);
            $table->dropForeign(['user_id']);

            // Re-add the unique index
            $table->unique(['chatroom_id', 'user_id']);

            // Re-add the foreign keys
            $table->foreign('chatroom_id')->references('id')->on('chatrooms')->cascadeOnDelete();
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }
};
