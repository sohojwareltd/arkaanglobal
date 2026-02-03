<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuoteRequestResource\Pages;
use App\Models\QuoteRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class QuoteRequestResource extends Resource
{
    protected static ?string $model = QuoteRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-inbox';

    protected static ?string $navigationLabel = 'Quote Requests';

    protected static ?string $navigationGroup = 'System';

    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Request Details')
                    ->schema([
                        Forms\Components\TextInput::make('company')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('contact_person')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('service_type')
                            ->label('Requested Service')
                            ->maxLength(255)
                            ->disabled()
                            ->dehydrated(false),
                        Forms\Components\DatePicker::make('preferred_start_date')
                            ->label('Preferred Start Date')
                            ->disabled()
                            ->dehydrated(false),
                        Forms\Components\Textarea::make('requirement_details')
                            ->label('Requirement Details')
                            ->rows(4)
                            ->disabled()
                            ->dehydrated(false),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Admin Tracking')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options([
                                'new' => 'New',
                                'contacted' => 'Contacted',
                                'quoted' => 'Quoted',
                                'won' => 'Won',
                                'lost' => 'Lost',
                            ])
                            ->default('new')
                            ->required()
                            ->helperText('Update the current stage of this request.'),
                        Forms\Components\Textarea::make('admin_comments')
                            ->label('Internal Comments / Progress Notes')
                            ->rows(4)
                            ->helperText('Add notes about calls, emails, and next steps. Visible only to admins.'),
                    ])
                    ->columns(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('company')
                    ->searchable(),
                Tables\Columns\TextColumn::make('contact_person')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('service_type')
                    ->badge(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->tooltip(fn (QuoteRequest $record): ?string => $record->admin_comments)
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'warning',
                        'contacted' => 'info',
                        'quoted' => 'primary',
                        'won' => 'success',
                        'lost' => 'danger',
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
                        'contacted' => 'Contacted',
                        'quoted' => 'Quoted',
                        'won' => 'Won',
                        'lost' => 'Lost',
                    ]),
                Tables\Filters\TernaryFilter::make('is_read')
                    ->label('Read')
                    ->trueLabel('Read')
                    ->falseLabel('Unread')
                    ->nullable()
                    ->queries(
                        true: fn ($query) => $query->whereNotNull('read_at'),
                        false: fn ($query) => $query->whereNull('read_at'),
                        blank: fn ($query) => $query,
                    ),
            ])
            ->actions([
                Tables\Actions\Action::make('markAsRead')
                    ->label('Mark as read')
                    ->icon('heroicon-m-eye')
                    ->visible(fn (QuoteRequest $record): bool => $record->read_at === null)
                    ->action(function (QuoteRequest $record): void {
                        $record->update(['read_at' => now()]);
                    }),
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuoteRequests::route('/'),
            'create' => Pages\CreateQuoteRequest::route('/create'),
            'edit' => Pages\EditQuoteRequest::route('/{record}/edit'),
        ];
    }
}
