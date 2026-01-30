<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Models\Testimonial;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Content Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('client_id')
                    ->relationship('client', 'name')
                    ->searchable()
                    ->preload()
                    ->nullable(),
                Forms\Components\TextInput::make('company')
                    ->maxLength(255)
                    ->helperText('Override company name if not linked to client'),
                Forms\Components\Textarea::make('quote_en')
                    ->label('Quote (English)')
                    ->required()
                    ->rows(3),
                Forms\Components\Textarea::make('quote_ar')
                    ->label('Quote (Arabic)')
                    ->required()
                    ->rows(3),
                Forms\Components\TextInput::make('author_en')
                    ->label('Author (English)')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('author_ar')
                    ->label('Author (Arabic)')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('position_en')
                    ->label('Position (English)')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('position_ar')
                    ->label('Position (Arabic)')
                    ->required()
                    ->maxLength(255),
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
                Tables\Columns\TextColumn::make('author_en')
                    ->label('Author')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('company')
                    ->formatStateUsing(fn (Testimonial $record) => $record->company ?? $record->client?->name ?? '-')
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
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}
