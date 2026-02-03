<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteRequestRequest;
use App\Models\QuoteRequest;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class QuoteRequestController extends Controller
{
    public function store(StoreQuoteRequestRequest $request): RedirectResponse
    {
        $quoteRequest = QuoteRequest::create([
            'company' => $request->validated('company'),
            'contact_person' => $request->validated('contact_person'),
            'email' => $request->validated('email'),
            'phone' => $request->validated('phone'),
            'service_type' => $request->validated('service_type'),
            'preferred_start_date' => $request->validated('preferred_start_date'),
            'requirement_details' => $request->validated('requirement_details'),
            'status' => 'new',
        ]);

        $notificationEmails = SiteSetting::get('quote_request_email') ?? config('mail.from.address');

        if ($notificationEmails) {
            $emails = array_filter(array_map('trim', explode(',', $notificationEmails)));

            if (! empty($emails)) {
                Mail::raw(
                    "A new quote request has been submitted.\n\n"
                    ."Company: {$quoteRequest->company}\n"
                    ."Contact Person: {$quoteRequest->contact_person}\n"
                    ."Email: {$quoteRequest->email}\n"
                    ."Phone: {$quoteRequest->phone}\n"
                    ."Service Type: {$quoteRequest->service_type}\n"
                    ."Preferred Start Date: {$quoteRequest->preferred_start_date}\n\n"
                    ."Details:\n{$quoteRequest->requirement_details}",
                    static function ($message) use ($emails): void {
                        $message->to($emails)
                            ->subject('New Quote Request');
                    }
                );
            }
        }

        return back()->with('success', true);
    }
}
