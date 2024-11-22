<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function bookings()
    {
        return $this->hasMany(CarBooking::class);
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachmentable')
            ->where('attachmentable_type', Car::class);
    }
}
