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
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show(Profile $profile)
    {
        //
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
    public function destroy(Profile $profile)
    {
        //
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
