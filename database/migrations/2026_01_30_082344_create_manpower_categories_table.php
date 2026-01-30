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
        Schema::create('manpower_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_en');
            $table->string('category_ar');
            $table->boolean('short_term')->default(true);
            $table->boolean('long_term')->default(true);
            $table->boolean('project_based')->default(true);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manpower_categories');
    }
};
