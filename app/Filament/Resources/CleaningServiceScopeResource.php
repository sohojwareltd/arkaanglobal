<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CleaningServiceScopeResource\Pages;
use App\Models\CleaningServiceScope;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CleaningServiceScopeResource extends Resource
{
    protected static ?string $model = CleaningServiceScope::class;

    protected static ?string $navigationIcon = 'heroicon-o-sparkles';

    protected static ?string $navigationLabel = 'Cleaning Service Scopes';

    protected static ?string $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('category_en')
                    ->label('Category (English)')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('category_ar')
                    ->label('Category (Arabic)')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('order')
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('is_active')
                    ->default(true),
                Forms\Components\Repeater::make('items')
                    ->relationship()
                    ->orderColumn('order')
                    ->schema([
                        Forms\Components\TextInput::make('text_en')
                            ->label('Service (English)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('text_ar')
                            ->label('Service (Arabic)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0),
                    ])
                    ->defaultItems(0)
                    ->reorderable()
                    ->reorderableWithButtons()
                    ->collapsible()
                    ->itemLabel(fn (array $state) => $state['text_en'] ?? 'New item'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('category_en')
                    ->label('Category (EN)')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category_ar')
                    ->label('Category (AR)')
                    ->searchable(),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active'),
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

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCleaningServiceScopes::route('/'),
            'create' => Pages\CreateCleaningServiceScope::route('/create'),
            'edit' => Pages\EditCleaningServiceScope::route('/{record}/edit'),
        ];
    }
}
