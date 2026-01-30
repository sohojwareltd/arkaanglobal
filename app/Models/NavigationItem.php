<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavigationItem extends Model
{
    protected $fillable = [
        'path',
        'label_en',
        'label_ar',
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
     * Get label based on current locale
     */
    public function getLabelAttribute(): string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->label_ar : $this->label_en;
    }
}
