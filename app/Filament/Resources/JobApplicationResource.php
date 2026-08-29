<?php

namespace App\Filament\Resources;

use App\Filament\Resources\JobApplicationResource\Pages;
use App\Models\JobApplication;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class JobApplicationResource extends Resource
{
    protected static ?string $model = JobApplication::class;

    protected static ?string $navigationIcon = 'heroicon-o-inbox-arrow-down';

    protected static ?string $navigationLabel = 'Job Applications';

    protected static ?string $navigationGroup = 'System';

    protected static ?int $navigationSort = 11;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Application Details')
                    ->schema([
                        Forms\Components\TextInput::make('jobPosting.title_en')
                            ->label('Position')
                            ->disabled()
                            ->dehydrated(false),
                        Forms\Components\TextInput::make('name')
                            ->disabled()
                            ->dehydrated(false),
                        Forms\Components\TextInput::make('email')
                            ->disabled()
                            ->dehydrated(false),
                        Forms\Components\TextInput::make('cv_original_name')
                            ->label('CV File')
                            ->disabled()
                            ->dehydrated(false),
                        Forms\Components\TextInput::make('ip_address')
                            ->label('IP Address')
                            ->disabled()
                            ->dehydrated(false),
                        Forms\Components\DateTimePicker::make('created_at')
                            ->label('Submitted At')
                            ->disabled()
                            ->dehydrated(false),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Admin Tracking')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options([
                                'new' => 'New',
                                'reviewing' => 'Reviewing',
                                'shortlisted' => 'Shortlisted',
                                'rejected' => 'Rejected',
                                'hired' => 'Hired',
                            ])
                            ->default('new')
                            ->required(),
                        Forms\Components\Textarea::make('admin_comments')
                            ->label('Internal Comments')
                            ->rows(4),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('jobPosting.title_en')
                    ->label('Position')
                    ->searchable()
                    ->sortable()
                    ->limit(30),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'warning',
                        'reviewing' => 'info',
                        'shortlisted' => 'primary',
                        'hired' => 'success',
                        'rejected' => 'danger',
                        default => 'gray',
                    }),
                Tables\Columns\IconColumn::make('read_at')
                    ->label('Read')
                    ->boolean()
                    ->trueIcon('heroicon-m-check-circle')
                    ->falseIcon('heroicon-m-envelope-open')
                    ->trueColor('success')
                    ->falseColor('warning'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'new' => 'New',
                        'reviewing' => 'Reviewing',
                        'shortlisted' => 'Shortlisted',
                        'rejected' => 'Rejected',
                        'hired' => 'Hired',
                    ]),
                Tables\Filters\SelectFilter::make('job_posting_id')
                    ->label('Position')
                    ->relationship('jobPosting', 'title_en'),
            ])
            ->actions([
                Tables\Actions\Action::make('downloadCv')
                    ->label('Download CV')
                    ->icon('heroicon-m-arrow-down-tray')
                    ->visible(fn (JobApplication $record): bool => Storage::disk('local')->exists($record->cv_path))
                    ->action(function (JobApplication $record): StreamedResponse {
                        return Storage::disk('local')->download(
                            $record->cv_path,
                            $record->cv_original_name,
                        );
                    }),
                Tables\Actions\Action::make('markAsRead')
                    ->label('Mark as read')
                    ->icon('heroicon-m-eye')
                    ->visible(fn (JobApplication $record): bool => $record->read_at === null)
                    ->action(function (JobApplication $record): void {
                        $record->update(['read_at' => now()]);
                    }),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListJobApplications::route('/'),
            'edit' => Pages\EditJobApplication::route('/{record}/edit'),
        ];
    }
}
