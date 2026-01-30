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
        Schema::create('cleaning_scope_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cleaning_service_scope_id')->constrained()->cascadeOnDelete();
            $table->string('text_en');
            $table->string('text_ar');
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cleaning_scope_items');
    }
};
