<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HseContent extends Model
{
    protected $fillable = [
        'key',
        'content_en',
        'content_ar',
        'link',
    ];

    /**
     * Get content based on current locale
     */
    public function getContentAttribute(): ?string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->content_ar : $this->content_en;
    }
}
