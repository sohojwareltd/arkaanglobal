<?php

namespace App\Filament\Resources\CleaningServiceScopeResource\Pages;

use App\Filament\Resources\CleaningServiceScopeResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCleaningServiceScope extends EditRecord
{
    protected static string $resource = CleaningServiceScopeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
