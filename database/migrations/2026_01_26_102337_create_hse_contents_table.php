<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hse_contents', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // commitments, policy_link
            $table->text('content_en')->nullable();
            $table->text('content_ar')->nullable();
            $table->string('link')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hse_contents');
    }
};
