<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    protected $fillable = [
        'key',
        'content_en',
        'content_ar',
    ];

    /**
     * Get content based on current locale
     */
    public function getContentAttribute(): string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->content_ar : $this->content_en;
    }
}
