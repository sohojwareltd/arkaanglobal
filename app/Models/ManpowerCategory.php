<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ManpowerCategory extends Model
{
    protected $fillable = [
        'category_en',
        'category_ar',
        'short_term',
        'long_term',
        'project_based',
        'order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'short_term' => 'boolean',
            'long_term' => 'boolean',
            'project_based' => 'boolean',
            'is_active' => 'boolean',
            'order' => 'integer',
        ];
    }
}
