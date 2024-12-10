<?php

namespace App\Http\Controllers;

use App\Models\CarBooking;
use Illuminate\Http\Request;

class CarBookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = CarBooking::with('cars.attachments', 'users.profile.attachments')
            ->select(['car_bookings.*']);

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

        $ret = [
            "success" => false,
            "message" => "Booking " . ($request->id ? "update" : "saved"),
            "data" => $request->all()
        ];

        $data =  [
            "car_id" => $request->car_id,
            "user_id" => $request->user_id,
            "date_start" => $request->date_start,
            "date_end" => $request->date_end,
            "time_start" => $request->time_start,
            "time_end" => $request->time_end,
            "status" => $request->status ?: 'to verify',
        ];


        try {
            // Update or create car record
            $query = CarBooking::updateOrCreate(
                ["id" => $request->id], // Update if ID exists, otherwise create
                $data
            );

            // Success response
            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "saved") . " successfully",
                "data" => $query,
            ];
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CarBooking  $carBooking
     * @return \Illuminate\Http\Response
     */
    public function show(CarBooking $carBooking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CarBooking  $carBooking
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CarBooking $carBooking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CarBooking  $carBooking
     * @return \Illuminate\Http\Response
     */
    public function destroy(CarBooking $carBooking)
    {
        //
    }
}
