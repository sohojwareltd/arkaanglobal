<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectGalleryItem extends Model
{
    protected $fillable = [
        'project_id',
        'type',
        'file',
        'video_url',
        'caption_en',
        'caption_ar',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'order' => 'integer',
        ];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function isVideo(): bool
    {
        return $this->type === 'video';
    }

    public function getMediaUrl(): ?string
    {
        if ($this->isVideo() && $this->video_url) {
            return $this->video_url;
        }

        if ($this->file) {
            return str_starts_with($this->file, 'http') || str_starts_with($this->file, '/')
                ? $this->file
                : '/storage/'.$this->file;
        }

        return null;
    }
}
