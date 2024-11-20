<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attachment extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];

    public function attachmentable()
    {
        return $this->morphTo();
    }

    public function profile() //added
    {
        return $this->belongsTo(Profile::class);
    }

    public function cars()
    {
        return $this->belongsTo(Car::class);
    }
}
