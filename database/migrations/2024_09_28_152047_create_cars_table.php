<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('created_by')->nullable();
            $table->integer('updated_by')->nullable();
            $table->string('name')->nullable();
            $table->longText('description')->nullable();
            $table->string('type')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('year_model')->nullable();
            $table->string('passengers')->nullable();
            $table->string('rates')->nullable();
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
        Schema::dropIfExists('cars');
    }
}
