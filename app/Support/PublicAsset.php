<?php

namespace App\Support;

class PublicAsset
{
    public static function url(string $path): string
    {
        $normalized = ltrim($path, '/');
        $fullPath = public_path($normalized);

        $version = config('app.asset_version');

        if ($version === null || $version === '') {
            $version = is_file($fullPath) ? (string) filemtime($fullPath) : '1';
        }

        return asset($normalized).'?v='.$version;
    }
}
