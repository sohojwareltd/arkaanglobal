<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Get current locale from session, cookie, or default
        $locale = Session::get('locale')
            ?? $request->cookie('locale')
            ?? config('app.locale', 'en');

        // Validate locale exists and is active
        $language = \App\Models\Language::where('code', $locale)
            ->where('is_active', true)
            ->first();

        if (! $language) {
            // Fallback to default language
            $defaultLanguage = \App\Models\Language::where('is_default', true)
                ->where('is_active', true)
                ->first();
            $locale = $defaultLanguage?->code ?? 'en';
        }

        Session::put('locale', $locale);
        app()->setLocale($locale);

        // Get available languages - handle case where table doesn't exist or is empty
        try {
            $languages = \App\Models\Language::where('is_active', true)
                ->orderBy('order')
                ->get()
                ->map(fn ($lang) => [
                    'code' => $lang->code,
                    'name' => $lang->name,
                    'native_name' => $lang->native_name,
                    'direction' => $lang->direction,
                    'flag' => $lang->flag,
                    'is_default' => $lang->is_default,
                ]);

            // Get default language
            $defaultLanguage = \App\Models\Language::where('is_default', true)
                ->where('is_active', true)
                ->first();
        } catch (\Exception $e) {
            // Fallback if Language model/table doesn't exist yet
            $languages = collect([
                ['code' => 'en', 'name' => 'English', 'native_name' => 'English', 'direction' => 'ltr', 'flag' => null, 'is_default' => true],
                ['code' => 'ar', 'name' => 'Arabic', 'native_name' => 'العربية', 'direction' => 'rtl', 'flag' => null, 'is_default' => false],
            ]);
            $defaultLanguage = (object) ['code' => 'en', 'direction' => 'ltr'];
        }

        $contactInfo = [];
        try {
            $contactInfo = \App\Models\ContactInfo::where('is_active', true)
                ->orderBy('order')
                ->get()
                ->map(fn ($c) => [
                    'key' => $c->key,
                    'value_en' => $c->value_en,
                    'value_ar' => $c->value_ar,
                    'icon' => $c->icon,
                ])
                ->keyBy('key')
                ->toArray();
        } catch (\Throwable) {
            $contactInfo = [];
        }

        return [
            ...parent::share($request),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
            'contactInfo' => $contactInfo,
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
            ],
            'locale' => $locale,
            'languages' => $languages->toArray(),
            'defaultLanguage' => $defaultLanguage ? [
                'code' => $defaultLanguage->code,
                'direction' => $defaultLanguage->direction,
            ] : ['code' => 'en', 'direction' => 'ltr'],
            'navigation' => (function () {
                try {
                    return \App\Models\NavigationItem::where('is_active', true)
                        ->orderBy('order')
                        ->get()
                        ->map(fn ($item) => [
                            'path' => $item->path,
                            'label_en' => $item->label_en,
                            'label_ar' => $item->label_ar,
                        ])->toArray();
                } catch (\Exception $e) {
                    // Fallback navigation if table doesn't exist
                    return [
                        ['path' => '/', 'label_en' => 'Home', 'label_ar' => 'الرئيسية'],
                        ['path' => '/about', 'label_en' => 'About', 'label_ar' => 'من نحن'],
                        ['path' => '/services', 'label_en' => 'Services', 'label_ar' => 'خدماتنا'],
                        ['path' => '/projects', 'label_en' => 'Projects', 'label_ar' => 'مشاريعنا'],
                        ['path' => '/clients', 'label_en' => 'Clients', 'label_ar' => 'عملاؤنا'],
                        ['path' => '/hse-contact', 'label_en' => 'HSE & Contact', 'label_ar' => 'السلامة والاتصال'],
                    ];
                }
            })(),
        ];
    }
}
