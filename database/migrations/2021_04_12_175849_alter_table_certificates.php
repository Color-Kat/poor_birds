<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableCertificates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->tinyInteger('grade')->default(0)->after('name');
            $table->mediumInteger('price_bonus')->default(50)->after('name');
            $table->mediumInteger('fertility_bonus')->default(50)->after('name');
            $table->mediumInteger('litter_bonus')->default(50)->after('name');
            $table->mediumInteger('demand_bonus')->default(50)->after('name');
            $table->mediumInteger('care_bonus')->default(5)->after('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('certificates', function (Blueprint $table) {
            $table->dropColumn('price_bonus');
            $table->dropColumn('fertility_bonus');
            $table->dropColumn('litter_bonus');
            $table->dropColumn('demand_bonus');
            $table->dropColumn('care_bonus');
            $table->dropColumn('grade');
        });
    }
}
