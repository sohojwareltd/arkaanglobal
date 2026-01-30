<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
    protected $fillable = [
        'key',
        'value_en',
        'value_ar',
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
     * Get value based on current locale
     */
    public function getValueAttribute(): string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->value_ar : $this->value_en;
    }
}
