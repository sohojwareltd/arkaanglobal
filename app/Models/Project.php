<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'client_id',
        'title_en',
        'title_ar',
        'location_en',
        'location_ar',
        'workers',
        'category',
        'year',
        'area_en',
        'area_ar',
        'duration_en',
        'duration_ar',
        'value_en',
        'value_ar',
        'description_en',
        'description_ar',
        'highlights_en',
        'highlights_ar',
        'image',
        'order',
        'is_active',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'order' => 'integer',
            'highlights_en' => 'array',
            'highlights_ar' => 'array',
        ];
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function galleryItems(): HasMany
    {
        return $this->hasMany(ProjectGalleryItem::class)->orderBy('order');
    }
}
