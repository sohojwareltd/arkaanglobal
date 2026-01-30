<?php

namespace App\Filament\Resources\HseContentResource\Pages;

use App\Filament\Resources\HseContentResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListHseContents extends ListRecords
{
    protected static string $resource = HseContentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
