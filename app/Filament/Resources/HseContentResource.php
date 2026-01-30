<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HseContentResource\Pages;
use App\Models\HseContent;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class HseContentResource extends Resource
{
    protected static ?string $model = HseContent::class;

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    protected static ?string $navigationLabel = 'HSE Content';

    protected static ?string $navigationGroup = 'Content Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('key')
                    ->options([
                        'commitments' => 'HSE Commitments',
                        'policy_link' => 'HSE Policy PDF Link',
                        'services_manpower_categories_title' => 'Services: Manpower Categories Section Title',
                        'services_cleaning_matrix_title' => 'Services: Cleaning Matrix Section Title',
                        'manpower_form_link' => 'Manpower Request Form PDF Link',
                    ])
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->helperText('Select content type'),
                Forms\Components\Section::make('Content')
                    ->schema(fn (Forms\Get $get) => match ($get('key')) {
                        'commitments' => [
                            Forms\Components\RichEditor::make('content_en')
                                ->label('Content (English)')
                                ->toolbarButtons(['bold', 'italic', 'underline', 'bulletList', 'orderedList', 'link'])
                                ->columnSpanFull(),
                            Forms\Components\RichEditor::make('content_ar')
                                ->label('Content (Arabic)')
                                ->toolbarButtons(['bold', 'italic', 'underline', 'bulletList', 'orderedList', 'link'])
                                ->columnSpanFull(),
                        ],
                        'services_manpower_categories_title', 'services_cleaning_matrix_title' => [
                            Forms\Components\TextInput::make('content_en')
                                ->label('Title (English)')
                                ->maxLength(255)
                                ->columnSpanFull(),
                            Forms\Components\TextInput::make('content_ar')
                                ->label('Title (Arabic)')
                                ->maxLength(255)
                                ->columnSpanFull(),
                        ],
                        default => [],
                    })
                    ->visible(fn ($get) => in_array($get('key'), ['commitments', 'services_manpower_categories_title', 'services_cleaning_matrix_title'])),
                Forms\Components\TextInput::make('link')
                    ->label('PDF Link/URL')
                    ->url()
                    ->maxLength(255)
                    ->visible(fn ($get) => in_array($get('key'), ['policy_link', 'manpower_form_link']))
                    ->helperText('Link to PDF file'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('key')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'commitments' => 'success',
                        'policy_link' => 'info',
                        'manpower_form_link' => 'warning',
                        'services_manpower_categories_title', 'services_cleaning_matrix_title' => 'primary',
                        default => 'gray',
                    })
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('content_en')
                    ->label('Content (EN)')
                    ->html()
                    ->limit(50)
                    ->searchable(),
                Tables\Columns\TextColumn::make('link')
                    ->label('Link')
                    ->url(fn ($record) => $record->link)
                    ->openUrlInNewTab()
                    ->limit(30),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('key')
                    ->options([
                        'commitments' => 'HSE Commitments',
                        'policy_link' => 'HSE Policy PDF Link',
                        'services_manpower_categories_title' => 'Services: Manpower Section Title',
                        'services_cleaning_matrix_title' => 'Services: Cleaning Matrix Title',
                        'manpower_form_link' => 'Manpower Form PDF Link',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHseContents::route('/'),
            'create' => Pages\CreateHseContent::route('/create'),
            'edit' => Pages\EditHseContent::route('/{record}/edit'),
        ];
    }
}
