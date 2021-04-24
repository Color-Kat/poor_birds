<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableBirdsAddEgsPrice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('birds', function (Blueprint $table) {
            $table->integer('egg_price')->default(1)->after('fertility');
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
            $table->dropColumn('egg_price');
        });
    }
}
