<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HeroSectionResource\Pages;
use App\Models\HeroSection;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class HeroSectionResource extends Resource
{
    protected static ?string $model = HeroSection::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationLabel = 'Hero Sections';

    protected static ?string $navigationGroup = 'Content Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('page')
                    ->options([
                        'home' => 'Home',
                        'about' => 'About',
                        'services' => 'Services',
                        'hse-contact' => 'HSE & Contact',
                    ])
                    ->required()
                    ->unique(ignoreRecord: true),
                Forms\Components\Section::make('English Content')
                    ->schema([
                        Forms\Components\TextInput::make('title_en')
                            ->label('Title')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('subtitle_en')
                            ->label('Subtitle')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('description_en')
                            ->label('Description')
                            ->rows(3),
                        Forms\Components\TextInput::make('cta_primary_text_en')
                            ->label('Primary CTA Text')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('cta_primary_link')
                            ->label('Primary CTA Link')
                            ->url()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('cta_secondary_text_en')
                            ->label('Secondary CTA Text')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('cta_secondary_link')
                            ->label('Secondary CTA Link')
                            ->url()
                            ->maxLength(255),
                    ])
                    ->columns(2),
                Forms\Components\Section::make('Arabic Content')
                    ->schema([
                        Forms\Components\TextInput::make('title_ar')
                            ->label('Title (العنوان)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('subtitle_ar')
                            ->label('Subtitle (العنوان الفرعي)')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('description_ar')
                            ->label('Description (الوصف)')
                            ->rows(3),
                        Forms\Components\TextInput::make('cta_primary_text_ar')
                            ->label('Primary CTA Text (نص الزر الأساسي)')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('cta_secondary_text_ar')
                            ->label('Secondary CTA Text (نص الزر الثانوي)')
                            ->maxLength(255),
                    ])
                    ->columns(2),
                Forms\Components\FileUpload::make('background_image')
                    ->image()
                    ->directory('hero-sections')
                    ->label('Background Image'),
                Forms\Components\Section::make('SEO Meta (optional)')
                    ->description('Override default meta for this page')
                    ->collapsible()
                    ->schema([
                        Forms\Components\TextInput::make('meta_title_en')
                            ->label('Meta Title (English)')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('meta_title_ar')
                            ->label('Meta Title (Arabic)')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('meta_description_en')
                            ->label('Meta Description (English)')
                            ->rows(2),
                        Forms\Components\Textarea::make('meta_description_ar')
                            ->label('Meta Description (Arabic)')
                            ->rows(2),
                        Forms\Components\Textarea::make('meta_keywords')
                            ->label('Meta Keywords (comma-separated)')
                            ->rows(2),
                    ]),
                Forms\Components\Toggle::make('is_active')
                    ->default(true)
                    ->label('Active'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('page')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'home' => 'success',
                        'about' => 'info',
                        'services' => 'warning',
                        'hse-contact' => 'danger',
                        default => 'gray',
                    })
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title (EN)')
                    ->searchable()
                    ->limit(30),
                Tables\Columns\TextColumn::make('title_ar')
                    ->label('Title (AR)')
                    ->searchable()
                    ->limit(30),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('page')
                    ->options([
                        'home' => 'Home',
                        'about' => 'About',
                        'services' => 'Services',
                        'hse-contact' => 'HSE & Contact',
                    ]),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHeroSections::route('/'),
            'create' => Pages\CreateHeroSection::route('/create'),
            'edit' => Pages\EditHeroSection::route('/{record}/edit'),
        ];
    }
}
