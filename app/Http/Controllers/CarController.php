<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $data = new Car;
        // $data = $data->select([
        //     "cars.*",
        // ]);
        $data = Car::with('attachments')
            ->select(['cars.*']);

        if (isset($request->search)) {
            $data = $data->where(function ($q) use ($request) {
                $q->orWhere("name", 'LIKE', "%$request->search%");
                $q->orWhere("type", 'LIKE', "%$request->search%");
                $q->orWhere("brand_name", 'LIKE', "%$request->search%");
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
        // $data = Car::query()->select("cars.*");

        // // Search functionality
        // if (!empty($request->search)) {
        //     $search = $request->search;
        //     $data->where(function ($query) use ($search) {
        //         $query->orWhere("name", "LIKE", "%$search%")
        //             ->orWhere("type", "LIKE", "%$search%")
        //             ->orWhere("brand_name", "LIKE", "%$search%");
        //     });
        // }

        // // Filter by status
        // if (!empty($request->status)) {
        //     $data->where("status", $request->status);
        // }

        // // Sorting functionality
        // $sortField = $request->sort_field ?? 'id';
        // $sortOrder = $request->sort_order ?? 'desc';

        // if (!in_array($sortOrder, ['asc', 'desc'])) {
        //     $sortOrder = 'desc';
        // }

        // $data->orderBy($sortField, $sortOrder);

        // // Pagination
        // $pageSize = $request->page_size ?? 10; // default page size if not provided
        // $pageNumber = $request->page_number ?? 1; // default page number if not provided

        // $data = $data->paginate($pageSize, ['*'], 'page', $pageNumber);

        // return response()->json([
        //     'success' => true,
        //     'data' => $data->toArray(),
        // ], 200);
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
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Reload the car record with its attachments
        // $carWithAttachments = Car::with('attachments')->find($id);
        $data =  Car::with('attachments')->find($id);

        return response()->json([
            'success'   => true,
            'data'      => $data
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Car $car)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Car  $car
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ret  = [
            "success" => false,
            "message" => "Data not delete"
        ];

        $findPayroll = Car::find($id);

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

    public function add_car_list(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Add Form " . ($request->id ? "update" : "saved"),
            "data" => $request->all()
        ];

        $data =  [
            "created_by" => $request->created_by,
            "updated_by" => $request->updated_by,
            "name" => $request->name,
            "description" => $request->description,
            "type" => $request->type,
            "brand_name" => $request->brand_name,
            "year_model" => $request->year_model,
            "passengers" => $request->passengers,
            "rates" => $request->rates,
            "folder_name" =>  $request->folder_name,
        ];

        try {
            // Update or create car record
            $query = Car::updateOrCreate(
                ["id" => $request->id], // Update if ID exists, otherwise create
                $data
            );

            // Check if the record was saved/updated successfully
            if ($query) {
                // Handle profile picture upload
                if ($request->hasFile("profile_picture")) {
                    $file = $request->file("profile_picture");
                    $this->create_attachment($query, $file, [

                        'folder_name' => "cars/car-{$query->id}/profile_pictures",
                        'file_description' => "Profile Picture",
                        'created_by' => "{$request->created_by}",
                    ]);
                }

                // Reload the car record with its attachments
                $carWithAttachments = Car::with('attachments')->find($query->id);

                // Success response
                $ret = [
                    "success" => true,
                    "message" => "Data " . ($request->id ? "updated" : "saved") . " successfully",
                    "data" => $carWithAttachments,
                ];
            }
        } catch (\Exception $e) {
            // Error handling
            $ret = [
                "success" => false,
                "message" => "An error occurred: " . $e->getMessage(),
                "data" => $request->all()
            ];
        }

        return response()->json($ret, 200);
    }

    public function delete_car_list(Request $request)
    {
        $ret = [
            "success" => false,
            "message" => "Signature not save"
        ];

        $find_id = Car::find($request->id);

        if ($find_id) {
            if ($find_id->delete()) {
                $ret = [
                    "success" => true,
                    "message" => "Car Deleted"
                ];
            }
        }
        return response()->json($ret, 200);
    }
}
