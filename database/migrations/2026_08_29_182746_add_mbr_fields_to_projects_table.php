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
        Schema::table('projects', function (Blueprint $table) {
            $table->string('slug')->nullable()->unique()->after('id');
            $table->string('year', 4)->nullable()->after('category');
            $table->string('area_en')->nullable()->after('workers');
            $table->string('area_ar')->nullable()->after('area_en');
            $table->string('duration_en')->nullable()->after('area_ar');
            $table->string('duration_ar')->nullable()->after('duration_en');
            $table->string('value_en')->nullable()->after('duration_ar');
            $table->string('value_ar')->nullable()->after('value_en');
            $table->json('highlights_en')->nullable()->after('description_ar');
            $table->json('highlights_ar')->nullable()->after('highlights_en');
            $table->boolean('is_featured')->default(false)->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'slug',
                'year',
                'area_en',
                'area_ar',
                'duration_en',
                'duration_ar',
                'value_en',
                'value_ar',
                'highlights_en',
                'highlights_ar',
                'is_featured',
            ]);
        });
    }
};
