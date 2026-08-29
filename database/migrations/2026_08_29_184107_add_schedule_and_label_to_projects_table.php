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
            $table->date('start_date')->nullable()->after('year');
            $table->date('end_date')->nullable()->after('start_date');
            $table->string('label_en')->nullable()->after('end_date');
            $table->string('label_ar')->nullable()->after('label_en');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['start_date', 'end_date', 'label_en', 'label_ar']);
        });
    }
};
