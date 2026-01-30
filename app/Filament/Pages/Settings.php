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
