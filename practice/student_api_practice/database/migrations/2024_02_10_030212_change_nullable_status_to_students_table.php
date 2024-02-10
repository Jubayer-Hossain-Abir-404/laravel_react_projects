<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('students', function (Blueprint $table) {
            $table->integer('degree_type')->nullable()->change(); // dropdown
            $table->string('gender', 1)->nullable()->change(); // radio
            $table->string('countries')->nullable()->change(); // multiple select
            $table->string('file')->nullable()->change(); // file
            $table->integer('range')->default(0)->change(); // range
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('students', function (Blueprint $table) {
            //
        });
    }
};
