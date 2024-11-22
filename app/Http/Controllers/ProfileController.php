<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $data = new User;
        // $data = $data->select([
        //     "users.*",
        // ]);
        $data = Profile::with('attachments')
            ->select(['profiles.*']);

        if (isset($request->search)) {
            $data = $data->where(function ($q) use ($request) {
                $q->orWhere("firstname", 'LIKE', "%$request->search%");
                $q->orWhere("middlename", 'LIKE', "%$request->search%");
                $q->orWhere("lastname", 'LIKE', "%$request->search%");
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
            "data" => $request->all()
        ];

        // Fetch the authenticated user
        $user = auth()->user(); // Ensure authentication middleware is applied

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Unauthorized access. User not found."
            ], 401);
        }

        $createdBy = $user ? $user->id : 0;
        // $createdBy = 0;

        $data =  [
            'firstname' => $request->firstname,
            'middlename' => $request->middlename,
            'lastname' => $request->lastname,
            'name_ext' => $request->name_ext,
            'gender' => $request->gender, // Make sure this is a string
            'residence' => $request->residence,
            'phone' => $request->phone,
            'user_id' => $createdBy,  // Foreign key reference
            'created_by' => $createdBy,
        ];

        if ($request->id) {
            $data['updated_by'] = $createdBy;
        }

        $profile = Profile::updateOrCreate(
            ['id' => $request->id],
            $data
        );

        // Check if the record was saved/updated successfully
        if ($profile) {
            // Handle profile picture upload
            if ($request->hasFile("profile_picture")) {
                $file = $request->file("profile_picture");
                $this->create_attachment($profile, $file, [

                    'folder_name' => "users/user-{$profile->id}/profile_pictures",
                    'file_description' => "Profile Picture",
                    'created_by' => "{$request->created_by}",
                ]);
            }

            // Reload the car record with its attachments
            $userWithAttachments = Profile::with('attachments')->find($profile->id);

            if ($profile) {
                $ret = [
                    "success" => true,
                    "message" => "Data " . ($request->id ? "updated" : "created") . " successfully",
                    "data" => $userWithAttachments,
                ];
            } else {
                $ret = [
                    "success" => false,
                    "message" => "Failed to " . ($request->id ? "update" : "create") . " data.",
                ];
            }

            return response()->json($ret, 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $data =  Profile::with('attachments')->find($id);

        return response()->json([
            'success'   => true,
            'data'      => $data
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Profile $profile)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $id)
    {
        $ret = [
            "success" => false,
            "message" => "Signature not save"
        ];
        $id = Profile::find($id);

        if ($id) {
            if ($id->delete()) {
                $ret = [
                    "success" => true,
                    "message" => "User Deleted"
                ];
            }
        }
        return response()->json($ret, 200);
    }

    public function delete_list($id)
    {
        $ret = [
            "success" => false,
            "message" => "Signature not save"
        ];
        $id = Profile::find($id);

        if ($id) {
            if ($id->delete()) {
                $ret = [
                    "success" => true,
                    "message" => "User Deleted"
                ];
            }
        }
        return response()->json($ret, 200);
    }

    public function upload_signature(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Signature not save"
        ];

        $findProfile = Profile::where("user_id", $request->user_id)->first();

        if ($findProfile && $request->hasFile('signature')) {
            $create_attachment = $this->create_attachment($findProfile, $request->file('signature'), [
                "action" => "Add",
                "folder_name" => "profiles/profile-$findProfile->id/signature",
                "file_description" => "Signature",
                "file_type" => "image",
            ]);

            if ($create_attachment) {
                $findProfileData = Profile::with([
                    "attachments" => function ($query) {
                        $query->orderBy("id", "desc");
                    }
                ])->find($findProfile->user_id);

                $ret = [
                    "success" => true,
                    "message" => "Signature save successfully",
                    "data" => $findProfileData

                ];
            }
        }

        return response()->json($ret, 200);
    }
}
