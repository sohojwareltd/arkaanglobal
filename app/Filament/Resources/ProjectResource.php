<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-folder';

    protected static ?string $navigationGroup = 'Content Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Project Details')
                    ->schema([
                        Forms\Components\Select::make('client_id')
                            ->label('Client')
                            ->relationship('client', 'name')
                            ->searchable()
                            ->preload()
                            ->nullable(),
                        Forms\Components\TextInput::make('title_en')
                            ->label('Title (English)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('title_ar')
                            ->label('Title (Arabic)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('location_en')
                            ->label('Location (English)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('location_ar')
                            ->label('Location (Arabic)')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('workers')
                            ->maxLength(255)
                            ->helperText('e.g. 2,500+'),
                        Forms\Components\Select::make('category')
                            ->options([
                                'construction' => 'Construction',
                                'infrastructure' => 'Infrastructure',
                                'commercial' => 'Commercial',
                                'industrial' => 'Industrial',
                            ])
                            ->required(),
                        Forms\Components\Textarea::make('description_en')
                            ->label('Description (English)')
                            ->rows(3),
                        Forms\Components\Textarea::make('description_ar')
                            ->label('Description (Arabic)')
                            ->rows(3),
                        Forms\Components\FileUpload::make('image')
                            ->image()
                            ->directory('projects')
                            ->visibility('public'),
                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0),
                        Forms\Components\Toggle::make('is_active')
                            ->default(true),
                    ]),
                Forms\Components\Section::make('Gallery')
                    ->description('Add images and videos with captions')
                    ->schema([
                        Forms\Components\Repeater::make('galleryItems')
                            ->relationship()
                            ->orderColumn('order')
                            ->schema([
                                Forms\Components\Select::make('type')
                                    ->options([
                                        'image' => 'Image',
                                        'video' => 'Video',
                                    ])
                                    ->required()
                                    ->live()
                                    ->default('image'),
                                Forms\Components\FileUpload::make('file')
                                    ->label(fn (Forms\Get $get) => $get('type') === 'video' ? 'Upload Video' : 'Upload Image')
                                    ->directory('projects/gallery')
                                    ->visibility('public')
                                    ->acceptedFileTypes(fn (Forms\Get $get) => $get('type') === 'video'
                                        ? ['video/mp4', 'video/webm', 'video/ogg']
                                        : ['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
                                    ->image(fn (Forms\Get $get) => $get('type') === 'image')
                                    ->required(fn (Forms\Get $get) => $get('type') === 'image')
                                    ->helperText(fn (Forms\Get $get) => $get('type') === 'video'
                                        ? 'Or use Video URL below for YouTube/Vimeo'
                                        : null),
                                Forms\Components\TextInput::make('video_url')
                                    ->label('Video URL (YouTube/Vimeo)')
                                    ->url()
                                    ->placeholder('https://youtube.com/... or https://vimeo.com/...')
                                    ->helperText('Use instead of upload for YouTube/Vimeo embeds')
                                    ->visible(fn (Forms\Get $get) => $get('type') === 'video'),
                                Forms\Components\TextInput::make('caption_en')
                                    ->label('Caption (English)')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('caption_ar')
                                    ->label('Caption (Arabic)')
                                    ->maxLength(255),
                            ])
                            ->defaultItems(0)
                            ->reorderable()
                            ->reorderableWithButtons()
                            ->collapsible()
                            ->itemLabel(fn (array $state) => ($state['type'] ?? 'image').' - '.($state['caption_en'] ?? 'No caption'))
                            ->columnSpanFull(),
                    ])
                    ->collapsed(false),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->circular()
                    ->defaultImageUrl(fn () => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100'),
                Tables\Columns\TextColumn::make('client.name')
                    ->label('Client')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('location_en')
                    ->label('Location')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'construction' => 'Construction',
                        'infrastructure' => 'Infrastructure',
                        'commercial' => 'Commercial',
                        'industrial' => 'Industrial',
                    ]),
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
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
