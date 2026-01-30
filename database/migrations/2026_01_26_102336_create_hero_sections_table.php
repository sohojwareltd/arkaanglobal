<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_sections', function (Blueprint $table) {
            $table->id();
            $table->string('page')->unique(); // home, about, services, hse-contact
            $table->string('title_en');
            $table->string('title_ar');
            $table->string('subtitle_en')->nullable();
            $table->string('subtitle_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_ar')->nullable();
            $table->string('cta_primary_text_en')->nullable();
            $table->string('cta_primary_text_ar')->nullable();
            $table->string('cta_primary_link')->nullable();
            $table->string('cta_secondary_text_en')->nullable();
            $table->string('cta_secondary_text_ar')->nullable();
            $table->string('cta_secondary_link')->nullable();
            $table->string('background_image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_sections');
    }
};
