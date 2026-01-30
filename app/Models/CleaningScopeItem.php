<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CleaningScopeItem extends Model
{
    protected $fillable = [
        'cleaning_service_scope_id',
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

    public function scope(): BelongsTo
    {
        return $this->belongsTo(CleaningServiceScope::class, 'cleaning_service_scope_id');
    }
}
