<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $ret = [
            'success' => false,
            'message' => 'Unrecognized username or password. <b>Forgot your password?</b>',
        ];

        $credentialsEmail = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (auth()->attempt($credentialsEmail)) {
            $user = auth()->user();

            if ($user->status == "Active") {
                $ret = [
                    'success' => true,
                    'message' => 'Login successfully.',
                    'data' => $this->login_data($user),
                    'token' => $user->createToken('authToken')->accessToken
                ];
            } else {
                $ret = [
                    'success' => false,
                    'message' => 'Your account is deactivated. Please contact the administrator.',
                ];
            }
        } else {
            $credentialsUsername = [
                'username' => $request->email,
                'password' => $request->password
            ];

            if (auth()->attempt($credentialsUsername)) {
                $user = auth()->user();

                if ($user->status == "Active") {
                    $ret = [
                        'success' => true,
                        'message' => 'Login successfully.',
                        'data' => $this->login_data($user),
                        'token' => $user->createToken('authToken')->accessToken
                    ];
                } else {
                    $ret = [
                        'success' => false,
                        'message' => 'Your account is deactivated. Please contact the administrator.',
                    ];
                }
            }
        }

        return response()->json($ret, 200);
    }

    public function login_data($user)
    {
        $dataProfile = \App\Models\Profile::with(["attachments" => function ($q) {
            return $q->orderBy("id", "desc");
        }])->firstWhere("user_id", $user->id);

        $firstname = "";
        $lastname = "";
        $profile_picture = "";

        if ($dataProfile) {
            $firstname = $dataProfile->firstname ?? null;
            $lastname = $dataProfile->lastname ?? null;

            if ($dataProfile->attachments) {
                $profile_picture = $dataProfile->attachments->first()->file_path ?? null;
            }
        }

        $user['firstname'] = $firstname;
        $user['lastname'] = $lastname;
        $user['profile_picture'] = $profile_picture;

        return $user;
    }
}
