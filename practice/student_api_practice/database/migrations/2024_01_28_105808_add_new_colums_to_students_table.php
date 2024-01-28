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
            $table->tinyInteger('degree_type')->after('phone'); // dropdown
            $table->string('gender', 1)->after('phone'); // radio
            $table->tinyInteger('isMarried')->default(0)->after('phone');  //checkbox
            $table->string('countries')->after('phone'); // multiple select
            $table->string('file')->after('phone'); // file
            $table->integer('range')->after('phone'); // range
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
