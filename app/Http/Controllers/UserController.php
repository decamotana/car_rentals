<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Laravel\Ui\Presets\React;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $data = new User;
        $data = $data->select([
            "users.*",
        ]);

        if (isset($request->search)) {
            $data = $data->where(function ($q) use ($request) {
                $q->orWhere("role", 'LIKE', "%$request->search%");
                $q->orWhere("email", 'LIKE', "%$request->search%");
                $q->orWhere("phone", 'LIKE', "%$request->search%");
                $q->orWhere("status", 'LIKE', "%$request->search%");
            });
        }

        if (isset($request->status)) {
            $data = $data->where('status', $request->status);
        }

        if ($request->sort_field && $request->sort_order) {
            if (
                $request->sort_field != '' && $request->sort_field != 'undefined' && $request->sort_field != 'null'  &&
                $request->sort_order != ''  && $request->sort_order != 'undefined' && $request->sort_order != 'null'
            ) {

                $data->orderBy(isset($request->sort_field) ? $request->sort_field : 'id', isset($request->sort_order)  ? $request->sort_order : 'desc');
            }
        } else {
            $data->orderBy('id', 'desc');
        }

        if ($request->page_size) {
            $data = $data
                ->limit($request->page_size)
                ->paginate($request->page_size, ['*'], 'page', $request->page_number)->toArray();
        } else {
            $data = $data->get();
        }

        return response()->json([
            'success' => true,
            'data' => $data,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ret = [
            "success" => true,
            "message" => "Data " . ($request->id ? "updated" : "created") . " successfully",
        ];

        $request->validate([
            'username' => [
                'required',
                Rule::unique('users')->ignore($request->id),
            ],
            'email' => [
                'required',
                Rule::unique('users')->ignore($request->id)
            ]
        ]);

        $data =  [
            'username' => $request->username,
            'email' => $request->email,
            'role' => $request->role,
            'status' => 'Active',
            'created_by' => $request->created_by,
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'gender' => $request->gender, // Make sure this is a string
            // 'residence' => json_encode($request->residence), // Save as JSON string
            'residence' => $request->residence,
            'phone' => $request->phone,
        ];

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }

        if ($request->status) {
            $data['status'] = $request->status;
        }

        if ($request->role) {
            $data['role'] = $request->role;
        }

        if ($request->id) {
            $data['updated_by'] = $request->updated_by;
        } else {
            $data['created_by'] = $request->created_by;
        }

        $data = User::updateOrCreate(
            ['id' => $request->id],
            $data
        );

        if ($data) {
            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "created") . " successfully",
            ];
        }

        return response()->json($ret, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = User::with([
            "profile" => function ($query) {
                $query->with([
                    "attachments" => function ($query) {
                        $query->orderBy("id", "desc");
                    },
                ]);
            }
        ])->find($id);

        $ret = [
            "success" => true,
            "data" => $data
        ];

        return response()->json($ret, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id) {}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ret  = [
            "success" => false,
            "message" => "Data not delete"
        ];

        $findPayroll = User::find($id);

        if ($findPayroll) {
            if ($findPayroll->delete()) {
                $ret  = [
                    "success" => true,
                    "message" => "Data deleted successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }

    public function users_update_email(Request $request)
    {
        $ret  = [
            "success" => true,
            "message" => "Email not updated",
        ];

        $data = User::find($request->id);

        if ($data) {
            $data = $data->fill(["email" => $request->email]);
            if ($data->save()) {
                $ret  = [
                    "success" => true,
                    "message" => "Email updated successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }

    public function users_update_password(Request $request)
    {
        $ret  = [
            "success" => false,
            "message" => "Password not updated",
        ];

        $data = User::find($request->id);

        if ($data) {
            $data = $data->fill(["password" => Hash::make($request->new_password)]);
            if ($data->save()) {
                $ret  = [
                    "success" => true,
                    "message" => "Password updated successfully"
                ];
            }
        }

        return response()->json($ret, 200);
    }

    public function users_info_update_password(Request $request)
    {
        $ret  = [
            "success" => false,
            "message" => "Password not updated",
        ];

        $data = User::find($request->id);

        if ($data) {
            if (Hash::check($request->old_password, $data->password)) {
                $data = $data->fill(["password" => Hash::make($request->new_password)]);
                if ($data->save()) {
                    $ret  = [
                        "success" => true,
                        "message" => "Password updated successfully"
                    ];
                }
            } else {
                $ret  = [
                    "success" => false,
                    "message" => "Old password did not match",
                ];
            }
        } else {
            $ret  = [
                "success" => false,
                "message" => "No found data",
            ];
        }

        return response()->json($ret, 200);
    }

    public function user_update_status(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not deactivate"
        ];

        $findUser = User::find($request->id);

        if ($findUser) {
            if ($findUser->status === 'Active') {
                // deactivate user
                $findUser->status = 'Deactivated';
                $findUser->deactivated_by = auth()->user()->id;
                $findUser->deactivated_at = now();

                if ($findUser->save()) {
                    $findUserProfile = Profile::where('id', $findUser->id)->first();

                    if ($findUserProfile) {
                        $findUserProfile->deactivated_by = auth()->user()->id;
                        $findUserProfile->deactivated_at = now();
                        $findUserProfile->save();
                    }

                    $ret = [
                        "success" => true,
                        "message" => "Data deactivated successfully"
                    ];
                }
            }
        } else {
            $ret = [
                "success" => false,
                "message" => "Failed to deactivate data"
            ];
        }

        return response()->json($ret, 200);
    }

    public function user_profile_info_update(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Data not updated"
        ];

        $find = User::find(auth()->user()->id);

        if ($find) {
            $findProfile = Profile::where("user_id", auth()->user()->id)->first();

            if ($findProfile) {
                $findProfile->fill([
                    "firstname" => $request->firstname,
                    "middlename" => $request->middlename,
                    "lastname" => $request->lastname,
                    "name_ext" => $request->name_ext,
                    "gender" => $request->gender,
                ])
                    ->save();
            }

            $ret = [
                "success" => true,
                "message" => "Data updated successfully"
            ];
        }

        return response()->json($ret, 200);
    }

    public function delete_list(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Signature not save"
        ];

        $find_id = User::find($request->id);

        if ($find_id) {
            if ($find_id->delete()) {
                $ret = [
                    "success" => true,
                    "message" => "User Deleted"
                ];
            }
        }
        return response()->json($ret, 200);
    }
}
