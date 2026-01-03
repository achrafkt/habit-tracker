<?php

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
        Schema::table('habits', function (Blueprint $table) {
            $table->string('category')->default('health')->after('user_id');
            $table->json('icon')->nullable()->after('color');
            $table->string('difficulty')->default('medium')->after('icon');
            $table->integer('target_days')->default(7)->after('target_count');
            $table->boolean('notification_enabled')->default(false)->after('target_days');
            $table->time('notification_time')->nullable()->after('notification_enabled');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('habits', function (Blueprint $table) {
            $table->dropColumn(['category', 'icon', 'difficulty', 'target_days', 'notification_enabled', 'notification_time']);
        });
    }
};
