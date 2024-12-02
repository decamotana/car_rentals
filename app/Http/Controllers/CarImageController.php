<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $baseFolder = "public/cars";

        // Get all folders under the base directory
        $carFolders = Storage::directories($baseFolder);

        $allCarImages = [];

        foreach ($carFolders as $folder) {
            // Get images from profile_pictures subdirectory
            $profilePicturesFolder = $folder . "/profile_pictures";

            if (Storage::exists($profilePicturesFolder)) {
                $images = Storage::files($profilePicturesFolder);

                $allCarImages[] = [
                    'car_folder' => basename($folder), // Get the car folder name
                    'images' => array_map(function ($file) {
                        return Storage::url($file);
                    }, $images),
                ];
            }
        }

        return response()->json([
            'success' => true,
            'data' => $allCarImages,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $folder = "public/cars/car-{$id}/profile_pictures";
        $files = Storage::files($folder);

        $filesUrls = array_map(function ($files) {
            return Storage::url($files);
        }, $files);

        return response()->json([
            'success' => true,
            'data' => $filesUrls,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
