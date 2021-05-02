<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableBirdSellerUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bird_seller_user', function (Blueprint $table) {
            $table->foreignId('certificate_id')->nullable()->after('count');
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
            $table->dropColumn('certificate_id');
        });
    }
}
