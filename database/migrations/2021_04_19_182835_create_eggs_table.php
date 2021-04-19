<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEggsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eggs', function (Blueprint $table) {
            $table->id();
            $table->integer('price'); // цена одного яйца
            $table->integer('demand'); // спрос - сколько за час можно продавать яиц
            $table->integer('count'); // кол-во яиц
//            $table->foreignId('user_id');
            $table->foreignId('bird_seller_id'); // чтобы различать яйца разных птиц
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eggs');
    }
}
