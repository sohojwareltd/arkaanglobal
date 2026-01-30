<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceItem extends Model
{
    protected $fillable = [
        'service_id',
        'text_en',
        'text_ar',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get text based on current locale
     */
    public function getTextAttribute(): string
    {
        $locale = app()->getLocale();

        return $locale === 'ar' ? $this->text_ar : $this->text_en;
    }
}
