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
                Forms\Components\Tabs::make('Application')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Overview')
                            ->schema([
                                Forms\Components\TextInput::make('application_number')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('jobPosting.title_en')
                                    ->label('Job Posting')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('position_applied')
                                    ->label('Trade Applied For')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('name')
                                    ->label('Full Name')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('email')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('mobile')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\DatePicker::make('date_of_birth')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('nationality')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('gender')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('cv_original_name')
                                    ->label('CV File')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('photo_original_name')
                                    ->label('Photo File')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\DateTimePicker::make('created_at')
                                    ->label('Submitted At')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('ip_address')
                                    ->label('IP Address')
                                    ->disabled()
                                    ->dehydrated(false),
                            ])
                            ->columns(2),
                        Forms\Components\Tabs\Tab::make('Personal & Preferences')
                            ->schema([
                                Forms\Components\TextInput::make('current_country')
                                    ->label('Country')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('current_city')
                                    ->label('City')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\Textarea::make('address')
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('years_experience')
                                    ->label('Years Experience')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('expected_salary')
                                    ->label('Expected Salary (SAR)')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('availability')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('preferred_location')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('employment_preference')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\Placeholder::make('mobility_summary')
                                    ->label('Mobility Regions')
                                    ->content(fn (?JobApplication $record): string => $record
                                        ? implode(', ', $record->mobility_regions ?? []) ?: '—'
                                        : '—')
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),
                        Forms\Components\Tabs\Tab::make('Passport & Experience')
                            ->schema([
                                Forms\Components\TextInput::make('passport_number')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\DatePicker::make('passport_expiry')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('visa_status')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\DatePicker::make('available_to_join')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('highest_qualification')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('field_major')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('institution')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('year_completed')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('recent_employer')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('employer_country')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('employer_position')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\Textarea::make('employment_history')
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),
                        Forms\Components\Tabs\Tab::make('Skills & Languages')
                            ->schema([
                                Forms\Components\Placeholder::make('skills_summary')
                                    ->label('Technical Skills')
                                    ->content(fn (?JobApplication $record): string => $record
                                        ? implode(', ', $record->technical_skills ?? []) ?: '—'
                                        : '—')
                                    ->columnSpanFull(),
                                Forms\Components\Textarea::make('other_skills')
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->columnSpanFull(),
                                Forms\Components\Textarea::make('certifications_notes')
                                    ->label('Certifications (Notes)')
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->columnSpanFull(),
                                Forms\Components\TextInput::make('lang_english')
                                    ->label('English')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('lang_arabic')
                                    ->label('Arabic')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('lang_hindi')
                                    ->label('Hindi / Urdu')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('lang_bengali')
                                    ->label('Bengali')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('other_language')
                                    ->disabled()
                                    ->dehydrated(false),
                                Forms\Components\TextInput::make('other_language_level')
                                    ->disabled()
                                    ->dehydrated(false),
                            ])
                            ->columns(2),
                        Forms\Components\Tabs\Tab::make('Documents')
                            ->schema([
                                Forms\Components\Repeater::make('attachments')
                                    ->relationship()
                                    ->schema([
                                        Forms\Components\TextInput::make('label')
                                            ->disabled()
                                            ->dehydrated(false),
                                        Forms\Components\TextInput::make('original_name')
                                            ->label('File Name')
                                            ->disabled()
                                            ->dehydrated(false),
                                    ])
                                    ->columns(2)
                                    ->addable(false)
                                    ->deletable(false)
                                    ->reorderable(false)
                                    ->defaultItems(0),
                            ]),
                        Forms\Components\Tabs\Tab::make('Admin')
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'new' => 'New',
                                        'reviewing' => 'Reviewing',
                                        'shortlisted' => 'Shortlisted',
                                        'rejected' => 'Rejected',
                                        'hired' => 'Hired',
                                    ])
                                    ->required(),
                                Forms\Components\Textarea::make('admin_comments')
                                    ->label('Internal Comments')
                                    ->rows(4)
                                    ->columnSpanFull(),
                                Forms\Components\DateTimePicker::make('declaration_accepted_at')
                                    ->disabled()
                                    ->dehydrated(false),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('application_number')
                    ->label('App No.')
                    ->searchable()
                    ->sortable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('position_applied')
                    ->label('Trade')
                    ->searchable()
                    ->sortable()
                    ->limit(24),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('mobile')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('nationality')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('attachments_count')
                    ->counts('attachments')
                    ->label('Docs')
                    ->sortable(),
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
                    ->label('Job Posting')
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
