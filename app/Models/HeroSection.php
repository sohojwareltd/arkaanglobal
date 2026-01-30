<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    protected $fillable = [
        'page',
        'title_en',
        'title_ar',
        'subtitle_en',
        'subtitle_ar',
        'description_en',
        'description_ar',
        'cta_primary_text_en',
        'cta_primary_text_ar',
        'cta_primary_link',
        'cta_secondary_text_en',
        'cta_secondary_text_ar',
        'cta_secondary_link',
        'background_image',
        'meta_title_en',
        'meta_title_ar',
        'meta_description_en',
        'meta_description_ar',
        'meta_keywords',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
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
     * Get subtitle based on current locale
     */
    public function getSubtitleAttribute(): ?string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->subtitle_ar : $this->subtitle_en;
    }

    /**
     * Get description based on current locale
     */
    public function getDescriptionAttribute(): ?string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->description_ar : $this->description_en;
    }

    /**
     * Get primary CTA text based on current locale
     */
    public function getCtaPrimaryTextAttribute(): ?string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->cta_primary_text_ar : $this->cta_primary_text_en;
    }

    /**
     * Get secondary CTA text based on current locale
     */
    public function getCtaSecondaryTextAttribute(): ?string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->cta_secondary_text_ar : $this->cta_secondary_text_en;
    }
}
