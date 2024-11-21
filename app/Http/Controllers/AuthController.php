<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Carbon\Carbon;
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
        // Uncomment this to see the request data
        // dd($request->all());

        // Validate the user input
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'middlename' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'confirm' => 'required_with:password|string|same:password|min:8',
            'gender' => 'required|string', // Validate gender as string
            'residence' => 'required|string|max:255',
            // 'residence' => 'required|array', // Change to array validation
            // 'residence.*' => 'string', // Ensure each item in the array is a string
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Save the user to the database
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password
            'role' => 'Admin',  // Default role
            'status' => 'Active', // Default status
            'remember_token' => (string)Str::random(10),
            'email_verified_at' => Carbon::now(),
            'created_by' => 1,
        ]);

        // Generate API token for the user
        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->accessToken;

        // Save the user's profile to the database
        $profile = Profile::create([
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'gender' => $request->gender, // Make sure this is a string
            // 'residence' => json_encode($request->residence), // Save as JSON string
            'residence' => $request->residence,
            'phone' => $request->phone,
            'user_id' => $user->id,  // Foreign key reference
            'created_by' => $user->id,
        ]);

        // Return a success response
        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user,
            'profile' => $profile,
            'token' => $token,
        ], 201);
    }
}
