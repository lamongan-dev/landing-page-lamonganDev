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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['offline', 'online']);
            $table->string('title');
            $table->enum('pricing_type', ['free', 'paid']);
            $table->dateTime('event_date');
            $table->string('cover_image_path')->nullable();
            $table->string('location')->nullable();
            $table->longText('description')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();

            $table->index('event_date');
            $table->index('type');
            $table->index('pricing_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
