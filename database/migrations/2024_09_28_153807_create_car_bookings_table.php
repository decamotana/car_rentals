<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('car_bookings', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('car_id')->unsigned()->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('date_start')->nullable();
            $table->string('date_end')->nullable();
            $table->string('time_start')->nullable();
            $table->string('time_end')->nullable();
            $table->string('status')->nullable()->default('Active');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('car_bookings');
    }
}
