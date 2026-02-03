<?php

namespace App\Filament\Pages;

use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class Settings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationGroup = 'Website Settings';

    protected static ?string $navigationLabel = 'Site Settings';

    protected static string $view = 'filament.pages.settings';

    public ?array $data = [];

    public function mount(): void
    {
        $ogImage = SiteSetting::get('og_image', '');
        $this->form->fill([
            'site_name' => SiteSetting::get('site_name', config('app.name')),
            'default_meta_title' => SiteSetting::get('default_meta_title', 'Arkaan Global Contracting'),
            'default_meta_description' => SiteSetting::get('default_meta_description', ''),
            'default_meta_keywords' => SiteSetting::get('default_meta_keywords', ''),
            'og_image' => $ogImage ? [$ogImage] : [],
            'cr_number' => SiteSetting::get('cr_number', ''),
            'vat_number' => SiteSetting::get('vat_number', ''),
            'map_embed_url' => SiteSetting::get('map_embed_url', ''),
            'quote_request_email' => SiteSetting::get('quote_request_email', ''),
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('SEO Settings')
                    ->description('Default meta tags used across the website')
                    ->schema([
                        Forms\Components\TextInput::make('site_name')
                            ->label('Site Name')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('default_meta_title')
                            ->label('Default Meta Title')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('default_meta_description')
                            ->label('Default Meta Description')
                            ->rows(3),
                        Forms\Components\Textarea::make('default_meta_keywords')
                            ->label('Default Meta Keywords')
                            ->rows(2)
                            ->helperText('Comma-separated keywords'),
                        Forms\Components\FileUpload::make('og_image')
                            ->label('Default OG Image')
                            ->image()
                            ->directory('seo')
                            ->visibility('public')
                            ->helperText('Image for social sharing (1200x630 recommended)'),
                    ]),
                Forms\Components\Section::make('Company Registration')
                    ->description('Legal registration details shown in the website footer')
                    ->schema([
                        Forms\Components\TextInput::make('cr_number')
                            ->label('Commercial Registration (CR) Number')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('vat_number')
                            ->label('VAT Number')
                            ->maxLength(255),
                    ]),
                Forms\Components\Section::make('Map & Location')
                    ->description('Configure the Google Maps embed URL used on the homepage contact section')
                    ->schema([
                        Forms\Components\TextInput::make('map_embed_url')
                            ->label('Map Embed URL')
                            ->helperText('Paste the Google Maps "Embed map" URL (the src attribute).')
                            ->maxLength(2048),
                    ]),
                Forms\Components\Section::make('Notifications')
                    ->description('Configure email notifications for website quote and contact requests')
                    ->schema([
                        Forms\Components\TextInput::make('quote_request_email')
                            ->label('Quote Request Notification Email(s)')
                            ->helperText('Comma-separated list of email addresses to notify when a quote request is submitted.')
                            ->maxLength(512),
                    ]),
                Forms\Components\Section::make('Website Counts')
                    ->description('Edit website statistics (Years Experience, Projects Completed, Workers Deployed, Satisfied Clients) in Content Management → Stats')
                    ->schema([
                        Forms\Components\Placeholder::make('stats_info')
                            ->label('')
                            ->content('Use the Stats resource to manage website count statistics displayed on the homepage.'),
                    ]),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $key => $value) {
            if ($key === 'og_image') {
                $value = is_array($value) && ! empty($value) ? $value[0] : ($value ?: null);
            }
            SiteSetting::set($key, $value);
        }

        Notification::make()
            ->title('Settings saved successfully')
            ->success()
            ->send();
    }

    protected function getFormActions(): array
    {
        return [
            \Filament\Actions\Action::make('save')
                ->label('Save')
                ->submit('save'),
        ];
    }
}
