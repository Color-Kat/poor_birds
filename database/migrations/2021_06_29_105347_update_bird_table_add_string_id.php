<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateBirdTableAddStringId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('birds', function (Blueprint $table) {
            // string_id - id птицы, по которому можно понять, тчо это именно та птица
            $table->string('string_id')->nullable()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('birds', function (Blueprint $table) {
            $table->dropColumn('string_id');
        });
    }
}
