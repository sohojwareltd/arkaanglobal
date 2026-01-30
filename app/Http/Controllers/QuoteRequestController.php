<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteRequestRequest;
use App\Models\QuoteRequest;
use Illuminate\Http\RedirectResponse;

class QuoteRequestController extends Controller
{
    public function store(StoreQuoteRequestRequest $request): RedirectResponse
    {
        QuoteRequest::create([
            'company' => $request->validated('company'),
            'contact_person' => $request->validated('contact_person'),
            'email' => $request->validated('email'),
            'phone' => $request->validated('phone'),
            'service_type' => $request->validated('service_type'),
            'preferred_start_date' => $request->validated('preferred_start_date'),
            'requirement_details' => $request->validated('requirement_details'),
            'status' => 'new',
        ]);

        return back()->with('success', true);
    }
}
