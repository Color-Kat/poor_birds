<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableUsersAddCurrencies extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Кол-во густинианов на счету пользователя (Покупаются за донат)
            $table->unsignedInteger('USD')->default(0)->after('money');
            $table->unsignedInteger('BTC')->default(0)->after('money');
            $table->unsignedInteger('GTN')->default(0)->after('money');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('USD');
            $table->dropColumn('BTC');
            $table->dropColumn('GTN');
        });
    }
}
