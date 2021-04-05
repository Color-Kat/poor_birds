<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableBirds extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('birds', function (Blueprint $table) {
            // litter - кол-во помета в час
            $table->mediumInteger('litter')->default(50)->after('fertility');

            // demand - сколько в среднем можно продать яиц этой птицы
            $table->mediumInteger('demand')->default(50)->after('litter');

            // care(-100 - 100) - на сколько процентов увеличивается плодоносность от ухода
            $table->tinyInteger('care')->default(5)->after('demand');
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
            $table->dropColumn('litter');
            $table->dropColumn('demand');
            $table->dropColumn('care');
        });
    }
}
