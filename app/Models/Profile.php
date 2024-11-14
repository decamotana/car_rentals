<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        // return $this->belongsTo(User::class, "user_id");
        return $this->belongsTo(User::class, "id");
    }

    public function attachments() //added
    {
        // return $this->hasMany(Attachment::class);
        return $this->morphMany(Attachment::class, 'attachmentable');
    }
}
