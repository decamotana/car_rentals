<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarBooking extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function cars()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
