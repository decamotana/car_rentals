<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\CarBooking;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            "message" => "Reservation " . ($request->id ? "update" : "saved"),
            "data" => $request->all()
        ];

        $data = [
            "car_id" => $request->car_id,
            "user_id" => $request->user_id,
            "date_start" => $request->date_start,
            "date_end" => $request->date_end,
            "time_start" => $request->time_start,
            "time_end" => $request->time_end,
            "status" => $request->status ?: 'Reserved',
        ];

        try {
            // Check for conflicting bookings
            $conflict = CarBooking::where('car_id', $request->car_id)
                ->where(function ($query) use ($request) {
                    // $query->whereBetween('date_start', [$request->date_start, $request->date_end])
                    //     ->orWhereBetween('date_end', [$request->date_start, $request->date_end])
                    //     ->orWhereRaw('? BETWEEN date_start AND date_end', [$request->date_start])
                    //     ->orWhereRaw('? BETWEEN date_start AND date_end', [$request->date_end]);
                    $query->where(function ($datequery) use ($request) {
                        $datequery->where('date_start', '<=', $request->date_end)
                            ->where('date_end', '>=', $request->date_start)
                            ->where(function ($timequery) use ($request) {
                                $timequery->where('time_end', '>', $request->time_start)
                                    ->orWhere('time_start', '<', $request->time_end);
                            });
                    });
                })
                ->where('id', '!=', $request->id) // Exclude the current booking if updating
                ->exists();

            if ($conflict) {
                return response()->json([
                    "success" => false,
                    "message" => "Booking conflict detected. The car is already booked during the specified dates.",
                    "data" => null
                ], 409); // Conflict HTTP status
            }

            // Update or create car booking record
            $query = CarBooking::updateOrCreate(
                ["id" => $request->id], // Update if ID exists, otherwise create
                $data
            );

            $bookedId = $query->id;

            Notification::create([
                "user_id" => $request->user_id,
                "message" => "A reservation has been " . ($bookedId ? "updated" : "created") . " for Car ID: " . $request->car_id,
                "status" => "unread",
                "booking_id" => $bookedId,
            ]);

            $unreadNotification = $this->getNotification();

            // Success response
            $ret = [
                "success" => true,
                "message" => "Data " . ($request->id ? "updated" : "saved") . " successfully",
                "data" => $query,
                'unread_notification' => $unreadNotification,
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

    public function getNotification()
    {
        return Notification::where('status', 'unread')->latest()->get();
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
    public function update(Request $request)
    {
        //
        $ret = [
            "success" => false,
            "message" => "Failed to approved booking",
            "data" => $request->all()
        ];

        $request->validate([
            "id" => "required|integer|exists:car_bookings,id", // Ensure ID exists in the database
            "status" => "required|string", // Ensure status is provided and is a string
        ]);

        $data =  [
            "status" => $request->status,
        ];


        try {
            $query = CarBooking::find($request->id);
            if ($query) {
                if ($request->status === 'Booked') {
                    $query->update($data);

                    $ret = [
                        "success" => true,
                        "message" => "Booking Approved",
                        "data" => $query,
                    ];

                    $findNotification = Notification::where('booking_id', $query->id)->first();

                    if ($findNotification) {
                        $findNotification->update([
                            "message" => "A reservation for book ID: " . $query->id . "has been done.",
                            "status" => "read",
                        ]);
                    }
                } else if ($request->status === 'Returned') {
                    $query->update($data);

                    $ret = [
                        "success" => true,
                        "message" => "Car is active for new Booking",
                        "data" => $query,
                    ];
                } else {
                    $ret["message"] = "Invalid status provided";
                }
                // Success response

            } else {
                $ret["message"] = "Id not found";
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CarBooking  $carBooking
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $ret = [
            "success" => false,
            "message" => "Signature not save",
            "Id" => $request->id
        ];

        $find_id = CarBooking::find($request->id);

        if ($find_id) {
            if ($find_id->delete()) {
                $ret = [
                    "success" => true,
                    "message" => "Reservation Deleted"
                ];
            }

            $findNotification = Notification::where('booking_id', $find_id->id)->first();

            if ($findNotification) {
                $findNotification->update([
                    "message" => "A reservation for book ID: " . $find_id->id . " disapproved for some reasons.",
                    "status" => "read",
                ]);
            }
        }


        return response()->json($ret, 200);
    }

    public function bookings()
    {
        $data = CarBooking::where('status', 'Booked')->count();

        $ret = [
            "success" => true,
            "count" => $data,
        ];

        return response()->json($ret, 200);
    }

    public function reserved()
    {
        $data = CarBooking::where('status', 'Reserved')->count();

        $ret = [
            "success" => true,
            "count" => $data,
        ];

        return response()->json($ret, 200);
    }

    public function bookedPerMonth()
    {
        $data = CarBooking::select(DB::raw('MONTHNAME(created_at) as month, COUNT(*) as count'))
            ->groupBy(DB::raw('MONTHNAME(created_at)'))
            ->get();

        $ret = [
            "success" => true,
            "data" => $data,
        ];

        return response()->json($ret, 200);
    }
}
