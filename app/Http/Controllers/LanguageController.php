<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    public function switch(Request $request, string $code): \Illuminate\Http\RedirectResponse
    {
        $language = Language::where('code', $code)
            ->where('is_active', true)
            ->first();

        if ($language) {
            Session::put('locale', $code);
            app()->setLocale($code);

            // Set cookie for persistence across sessions
            cookie()->queue('locale', $code, 60 * 24 * 365); // 1 year
        }

        return redirect()->back();
    }

    public function getLanguages(): \Illuminate\Http\JsonResponse
    {
        $languages = Language::where('is_active', true)
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

        return response()->json($languages);
    }
}
