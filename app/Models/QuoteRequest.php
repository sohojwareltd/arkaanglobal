<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuoteRequest extends Model
{
    protected $fillable = [
        'company',
        'contact_person',
        'email',
        'phone',
        'service_type',
        'preferred_start_date',
        'requirement_details',
        'status',
    ];
}
