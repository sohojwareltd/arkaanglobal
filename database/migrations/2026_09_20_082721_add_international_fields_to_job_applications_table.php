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
        Schema::table('job_applications', function (Blueprint $table) {
            $table->string('application_number')->nullable()->unique()->after('id');

            $table->date('date_of_birth')->nullable()->after('email');
            $table->string('nationality')->nullable()->after('date_of_birth');
            $table->string('gender', 20)->nullable()->after('nationality');
            $table->string('mobile')->nullable()->after('gender');
            $table->string('current_country')->nullable()->after('mobile');
            $table->string('current_city')->nullable()->after('current_country');
            $table->text('address')->nullable()->after('current_city');

            $table->string('position_applied')->nullable()->after('address');
            $table->unsignedSmallInteger('years_experience')->nullable()->after('position_applied');
            $table->decimal('expected_salary', 12, 2)->nullable()->after('years_experience');
            $table->string('availability')->nullable()->after('expected_salary');
            $table->string('preferred_location')->nullable()->after('availability');
            $table->string('employment_preference')->nullable()->after('preferred_location');

            $table->string('passport_number')->nullable()->after('employment_preference');
            $table->date('passport_expiry')->nullable()->after('passport_number');
            $table->string('visa_status')->nullable()->after('passport_expiry');
            $table->date('available_to_join')->nullable()->after('visa_status');
            $table->json('mobility_regions')->nullable()->after('available_to_join');

            $table->string('highest_qualification')->nullable()->after('mobility_regions');
            $table->string('field_major')->nullable()->after('highest_qualification');
            $table->string('institution')->nullable()->after('field_major');
            $table->unsignedSmallInteger('year_completed')->nullable()->after('institution');

            $table->string('recent_employer')->nullable()->after('year_completed');
            $table->string('employer_country')->nullable()->after('recent_employer');
            $table->string('employer_position')->nullable()->after('employer_country');
            $table->text('employment_history')->nullable()->after('employer_position');

            $table->json('technical_skills')->nullable()->after('employment_history');
            $table->text('other_skills')->nullable()->after('technical_skills');
            $table->text('certifications_notes')->nullable()->after('other_skills');

            $table->string('lang_english')->nullable()->after('certifications_notes');
            $table->string('lang_arabic')->nullable()->after('lang_english');
            $table->string('lang_hindi')->nullable()->after('lang_arabic');
            $table->string('lang_bengali')->nullable()->after('lang_hindi');
            $table->string('other_language')->nullable()->after('lang_bengali');
            $table->string('other_language_level')->nullable()->after('other_language');

            $table->string('photo_path')->nullable()->after('cv_original_name');
            $table->string('photo_original_name')->nullable()->after('photo_path');

            $table->timestamp('declaration_accepted_at')->nullable()->after('photo_original_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->dropColumn([
                'application_number',
                'date_of_birth',
                'nationality',
                'gender',
                'mobile',
                'current_country',
                'current_city',
                'address',
                'position_applied',
                'years_experience',
                'expected_salary',
                'availability',
                'preferred_location',
                'employment_preference',
                'passport_number',
                'passport_expiry',
                'visa_status',
                'available_to_join',
                'mobility_regions',
                'highest_qualification',
                'field_major',
                'institution',
                'year_completed',
                'recent_employer',
                'employer_country',
                'employer_position',
                'employment_history',
                'technical_skills',
                'other_skills',
                'certifications_notes',
                'lang_english',
                'lang_arabic',
                'lang_hindi',
                'lang_bengali',
                'other_language',
                'other_language_level',
                'photo_path',
                'photo_original_name',
                'declaration_accepted_at',
            ]);
        });
    }
};
