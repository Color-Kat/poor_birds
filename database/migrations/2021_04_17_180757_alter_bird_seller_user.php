<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterBirdSellerUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bird_seller_user', function (Blueprint $table) {
            $table->bigInteger('count')->default(1)->after('bird_seller_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bird_seller_user', function (Blueprint $table) {
            $table->dropColumn('count');
        });
    }
}
