<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use illuminate\Support\Str;

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
            } else {
                $credentials = [
                    'username' => $request->username,
                    'password' => $request->password
                ];

                if (auth()->attempt($credentials)) {
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

    public function register(Request $request)
    {
        $ret = [
            "success" => true,
            "message" => "Data " . ($request->id ? "updated" : "created") . " successfully",
            "data" => $request->all()
        ];

        $createdBy = 0;

        $userData =  [
            'username' => $request->username,
            'email' => $request->email,
            'remember_token' => (string)Str::random(10),
            // 'email_verified_at' => Carbon::now(), //this is remove to send email verification
            'created_by' => $createdBy,
            'role' => 'Admin',
            'status' => $request->status ?: 'Active',
        ];

        if ($request->password) {
            $userData['password'] = Hash::make($request->password);
        }

        $user = User::create(
            $userData
        );

        //this will trigger the email verification email
        event(new Registered($user));

        // Generate API token for the user
        if (!$request->id) { // Only generate a token if creating a new user
            $tokenResult = $user->createToken('auth_token');
            $token = $tokenResult->accessToken;

            // Return the response with the token
            $ret['token'] = $token;
        }

        $profileData =  [
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'name_ext' => $request->name_ext,
            'gender' => $request->gender, // Make sure this is a string
            'residence' => $request->residence,
            'phone' => $request->phone,
            'user_id' => $user->id,  // Foreign key reference
        ];

        $profile = Profile::create($profileData);

        // Return a success response
        $ret = [
            "success" => false,
            "message" => "Operation failed. Data could not be " . ($request->id ? "updated" : "created") . ".",
        ];

        if ($user || $profile) {
            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "created") . " successfully, Please check your Email for verification.",
                "user" => [
                    "id" => $user->id,
                    "email" => $user->email,
                    "email_verified_at" => $user->email_verified_at,
                ],
                'token' => $token ?? null, // Only include token if it's set
            ];
        }

        return response()->json($ret, $ret['success'] ? 200 : 500);
    }
}
