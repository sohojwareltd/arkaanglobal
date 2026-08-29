<?php

namespace App\Filament\Resources\JobApplicationResource\Pages;

use App\Filament\Resources\JobApplicationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class EditJobApplication extends EditRecord
{
    protected static string $resource = JobApplicationResource::class;

    protected function getHeaderActions(): array
    {
        $actions = [
            Actions\DeleteAction::make(),
        ];

        $record = $this->getRecord();

        if (Storage::disk('local')->exists($record->cv_path)) {
            $actions[] = Actions\Action::make('downloadCv')
                ->label('Download CV')
                ->icon('heroicon-m-arrow-down-tray')
                ->action(function () use ($record): StreamedResponse {
                    return Storage::disk('local')->download(
                        $record->cv_path,
                        $record->cv_original_name,
                    );
                });
        }

        $record->loadMissing('attachments');

        foreach ($record->attachments as $attachment) {
            if (! Storage::disk('local')->exists($attachment->file_path)) {
                continue;
            }

            $label = $attachment->label ?: 'Document';

            $actions[] = Actions\Action::make('download_attachment_'.$attachment->id)
                ->label('Download '.$label)
                ->icon('heroicon-m-paper-clip')
                ->action(function () use ($attachment): StreamedResponse {
                    return Storage::disk('local')->download(
                        $attachment->file_path,
                        $attachment->original_name,
                    );
                });
        }

        return $actions;
    }
}
