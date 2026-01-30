<?php

namespace App\Filament\Resources\HseContentResource\Pages;

use App\Filament\Resources\HseContentResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditHseContent extends EditRecord
{
    protected static string $resource = HseContentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
