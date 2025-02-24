<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    //
    public function sendEmail(Request $request)
    {
        $details = [
            'email' => $request->email,
            // 'subject' => $request->title,
            'body' => $request->body
        ];

        Mail::to($request->email)->send(new ContactMail($details));

        return response()->json(['message' => 'Email sent successfully!']);
    }
}
