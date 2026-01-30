<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    protected $fillable = [
        'slug',
        'title_en',
        'title_ar',
        'description_en',
        'description_ar',
        'icon',
        'image',
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

    public function items(): HasMany
    {
        return $this->hasMany(ServiceItem::class)->orderBy('order');
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
    public function getDescriptionAttribute(): ?string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->description_ar : $this->description_en;
    }
}
