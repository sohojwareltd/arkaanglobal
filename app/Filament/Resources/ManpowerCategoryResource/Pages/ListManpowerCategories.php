<?php

namespace App\Filament\Resources\ManpowerCategoryResource\Pages;

use App\Filament\Resources\ManpowerCategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListManpowerCategories extends ListRecords
{
    protected static string $resource = ManpowerCategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
