<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhyChooseUs extends Model
{
    protected $fillable = [
        'title_en',
        'title_ar',
        'description_en',
        'description_ar',
        'icon',
        'order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'order' => 'integer',
        ];
    }

    /**
     * Get title based on current locale
     */
    public function getTitleAttribute(): string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->title_ar : $this->title_en;
    }

    /**
     * Get description based on current locale
     */
    public function getDescriptionAttribute(): string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->description_ar : $this->description_en;
    }
}
