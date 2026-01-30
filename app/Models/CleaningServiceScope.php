<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CleaningServiceScope extends Model
{
    protected $fillable = [
        'category_en',
        'category_ar',
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
        return $this->hasMany(CleaningScopeItem::class)->orderBy('order');
    }
}
