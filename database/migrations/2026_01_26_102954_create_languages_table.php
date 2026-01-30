<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique(); // en, ar, fr, etc.
            $table->string('name'); // English, Arabic, French
            $table->string('native_name'); // English, العربية, Français
            $table->string('direction', 3)->default('ltr'); // ltr, rtl
            $table->string('flag')->nullable(); // Flag emoji or icon
            $table->boolean('is_active')->default(true);
            $table->boolean('is_default')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('languages');
    }
};
