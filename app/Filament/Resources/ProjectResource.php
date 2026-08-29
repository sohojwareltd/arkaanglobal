<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-folder';

    protected static ?string $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 3;

    /** @return array<string, string> */
    public static function categoryOptions(): array
    {
        return [
            'commercial' => 'Commercial',
            'residential' => 'Residential',
            'industrial' => 'Industrial',
            'infrastructure' => 'Infrastructure',
        ];
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Project')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Overview')
                            ->schema([
                                Forms\Components\Section::make('Basic Information')
                                    ->columns(2)
                                    ->schema([
                                        Forms\Components\TextInput::make('title_en')
                                            ->label('Title (English)')
                                            ->required()
                                            ->maxLength(255)
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(function (Set $set, ?string $state, ?Project $record): void {
                                                if ($record?->slug) {
                                                    return;
                                                }

                                                $set('slug', Str::slug($state ?? ''));
                                            }),
                                        Forms\Components\TextInput::make('title_ar')
                                            ->label('Title (Arabic)')
                                            ->required()
                                            ->maxLength(255),
                                        Forms\Components\TextInput::make('slug')
                                            ->maxLength(255)
                                            ->unique(ignoreRecord: true)
                                            ->helperText('Optional URL slug for future use'),
                                        Forms\Components\Select::make('category')
                                            ->options(self::categoryOptions())
                                            ->required()
                                            ->native(false),
                                        Forms\Components\Select::make('client_id')
                                            ->label('Client')
                                            ->relationship('client', 'name')
                                            ->searchable()
                                            ->preload()
                                            ->nullable(),
                                        Forms\Components\TextInput::make('year')
                                            ->label('Completion Year')
                                            ->maxLength(4)
                                            ->placeholder('2024')
                                            ->helperText('Shown on project cards and detail stats'),
                                        Forms\Components\Toggle::make('is_featured')
                                            ->label('Featured Project')
                                            ->helperText('Shows a featured badge on listing cards'),
                                    ]),
                                Forms\Components\Section::make('Location & Metrics')
                                    ->description('Displayed in the project detail stats bar and sidebar')
                                    ->columns(2)
                                    ->schema([
                                        Forms\Components\TextInput::make('location_en')
                                            ->label('Location (English)')
                                            ->required()
                                            ->maxLength(255)
                                            ->placeholder('Riyadh, Al Malqa'),
                                        Forms\Components\TextInput::make('location_ar')
                                            ->label('Location (Arabic)')
                                            ->required()
                                            ->maxLength(255),
                                        Forms\Components\TextInput::make('area_en')
                                            ->label('Area / Size (English)')
                                            ->maxLength(255)
                                            ->placeholder('950 M²'),
                                        Forms\Components\TextInput::make('area_ar')
                                            ->label('Area / Size (Arabic)')
                                            ->maxLength(255),
                                        Forms\Components\TextInput::make('duration_en')
                                            ->label('Duration (English)')
                                            ->maxLength(255)
                                            ->placeholder('10 Months'),
                                        Forms\Components\TextInput::make('duration_ar')
                                            ->label('Duration (Arabic)')
                                            ->maxLength(255),
                                        Forms\Components\TextInput::make('value_en')
                                            ->label('Project Value (English)')
                                            ->maxLength(255)
                                            ->placeholder('Confidential'),
                                        Forms\Components\TextInput::make('value_ar')
                                            ->label('Project Value (Arabic)')
                                            ->maxLength(255),
                                        Forms\Components\TextInput::make('workers')
                                            ->label('Workforce Deployed')
                                            ->maxLength(255)
                                            ->placeholder('2,500+')
                                            ->helperText('Optional — shown in project details when set'),
                                    ]),
                            ]),
                        Forms\Components\Tabs\Tab::make('Content')
                            ->schema([
                                Forms\Components\Section::make('About This Project')
                                    ->description('Long-form description shown on the project detail page')
                                    ->schema([
                                        Forms\Components\Textarea::make('description_en')
                                            ->label('Description (English)')
                                            ->rows(8)
                                            ->columnSpanFull(),
                                        Forms\Components\Textarea::make('description_ar')
                                            ->label('Description (Arabic)')
                                            ->rows(8)
                                            ->columnSpanFull(),
                                    ]),
                                Forms\Components\Section::make('Project Highlights')
                                    ->description('Bullet points shown under the description (e.g. client name, location, completion time)')
                                    ->columns(2)
                                    ->schema([
                                        Forms\Components\TagsInput::make('highlights_en')
                                            ->label('Highlights (English)')
                                            ->placeholder('Add highlight and press Enter')
                                            ->helperText('Example: Arab National Bank, Riyadh, 10 Months Completion'),
                                        Forms\Components\TagsInput::make('highlights_ar')
                                            ->label('Highlights (Arabic)')
                                            ->placeholder('Add highlight and press Enter'),
                                    ]),
                            ]),
                        Forms\Components\Tabs\Tab::make('Media')
                            ->schema([
                                Forms\Components\Section::make('Cover Image')
                                    ->schema([
                                        Forms\Components\FileUpload::make('image')
                                            ->label('Primary Cover Image')
                                            ->image()
                                            ->directory('projects')
                                            ->visibility('public')
                                            ->helperText('Used as the first slide in the project gallery'),
                                    ]),
                                Forms\Components\Section::make('Gallery')
                                    ->description('Additional project photos for the image slider')
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
                                                    ->required(fn (Forms\Get $get) => $get('type') === 'image'),
                                                Forms\Components\TextInput::make('video_url')
                                                    ->label('Video URL (YouTube/Vimeo)')
                                                    ->url()
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
                                            ->itemLabel(fn (array $state) => ($state['type'] ?? 'image').' — '.($state['caption_en'] ?? 'Gallery item'))
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                        Forms\Components\Tabs\Tab::make('Publishing')
                            ->schema([
                                Forms\Components\TextInput::make('order')
                                    ->numeric()
                                    ->default(0)
                                    ->required(),
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Published')
                                    ->default(true),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Cover')
                    ->circular()
                    ->defaultImageUrl(fn () => 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100'),
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title')
                    ->searchable()
                    ->sortable()
                    ->limit(40),
                Tables\Columns\TextColumn::make('client.name')
                    ->label('Client')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('year')
                    ->label('Year')
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('location_en')
                    ->label('Location')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Published')
                    ->boolean(),
            ])
            ->defaultSort('order')
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options(self::categoryOptions()),
                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Featured'),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Published'),
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
        return [];
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
