<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ManpowerCategoryResource\Pages;
use App\Models\ManpowerCategory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ManpowerCategoryResource extends Resource
{
    protected static ?string $model = ManpowerCategory::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationLabel = 'Manpower Categories';

    protected static ?string $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 3;

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
                Forms\Components\Toggle::make('short_term')
                    ->label('Short-term')
                    ->default(true),
                Forms\Components\Toggle::make('long_term')
                    ->label('Long-term')
                    ->default(true),
                Forms\Components\Toggle::make('project_based')
                    ->label('Project-based')
                    ->default(true),
                Forms\Components\TextInput::make('order')
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('is_active')
                    ->default(true),
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
                Tables\Columns\IconColumn::make('short_term')
                    ->boolean(),
                Tables\Columns\IconColumn::make('long_term')
                    ->boolean(),
                Tables\Columns\IconColumn::make('project_based')
                    ->boolean(),
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
            'index' => Pages\ListManpowerCategories::route('/'),
            'create' => Pages\CreateManpowerCategory::route('/create'),
            'edit' => Pages\EditManpowerCategory::route('/{record}/edit'),
        ];
    }
}
