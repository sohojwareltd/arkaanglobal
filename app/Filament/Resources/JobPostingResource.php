<?php

namespace App\Filament\Resources;

use App\Filament\Resources\JobPostingResource\Pages;
use App\Models\JobPosting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class JobPostingResource extends Resource
{
    protected static ?string $model = JobPosting::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Job Postings';

    protected static ?string $navigationGroup = 'Content Management';

    protected static ?int $navigationSort = 4;

    /** @return array<string, string> */
    public static function employmentTypeOptions(): array
    {
        return [
            'full-time' => 'Full Time',
            'part-time' => 'Part Time',
            'contract' => 'Contract',
            'temporary' => 'Temporary',
        ];
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Job Posting')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('English')
                            ->schema([
                                Forms\Components\TextInput::make('title_en')
                                    ->label('Job Title')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\RichEditor::make('description_en')
                                    ->label('Job Description')
                                    ->required()
                                    ->columnSpanFull()
                                    ->toolbarButtons([
                                        'bold',
                                        'bulletList',
                                        'h2',
                                        'h3',
                                        'italic',
                                        'orderedList',
                                        'redo',
                                        'underline',
                                        'undo',
                                    ]),
                                Forms\Components\TextInput::make('location_en')
                                    ->label('Location')
                                    ->maxLength(255),
                            ]),
                        Forms\Components\Tabs\Tab::make('Arabic')
                            ->schema([
                                Forms\Components\TextInput::make('title_ar')
                                    ->label('Job Title (Arabic)')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\RichEditor::make('description_ar')
                                    ->label('Job Description (Arabic)')
                                    ->required()
                                    ->columnSpanFull()
                                    ->toolbarButtons([
                                        'bold',
                                        'bulletList',
                                        'h2',
                                        'h3',
                                        'italic',
                                        'orderedList',
                                        'redo',
                                        'underline',
                                        'undo',
                                    ]),
                                Forms\Components\TextInput::make('location_ar')
                                    ->label('Location (Arabic)')
                                    ->maxLength(255),
                            ]),
                        Forms\Components\Tabs\Tab::make('Settings')
                            ->schema([
                                Forms\Components\Select::make('employment_type')
                                    ->options(self::employmentTypeOptions())
                                    ->default('full-time')
                                    ->required(),
                                Forms\Components\DatePicker::make('application_deadline')
                                    ->label('Application Deadline')
                                    ->helperText('Leave empty for open-ended applications.'),
                                Forms\Components\TextInput::make('order')
                                    ->numeric()
                                    ->default(0)
                                    ->required(),
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Published')
                                    ->default(true)
                                    ->required(),
                            ])
                            ->columns(2),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title_en')
                    ->label('Title')
                    ->searchable()
                    ->sortable()
                    ->limit(40),
                Tables\Columns\TextColumn::make('employment_type')
                    ->badge()
                    ->sortable(),
                Tables\Columns\TextColumn::make('location_en')
                    ->label('Location')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('applications_count')
                    ->counts('applications')
                    ->label('Applications')
                    ->sortable(),
                Tables\Columns\TextColumn::make('application_deadline')
                    ->date('d M Y')
                    ->placeholder('Open')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Published')
                    ->boolean(),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('order')
            ->filters([
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
            'index' => Pages\ListJobPostings::route('/'),
            'create' => Pages\CreateJobPosting::route('/create'),
            'edit' => Pages\EditJobPosting::route('/{record}/edit'),
        ];
    }
}
