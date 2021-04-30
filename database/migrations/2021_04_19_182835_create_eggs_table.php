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
            $table->string('name'); // название птицы
            $table->unsignedBigInteger('birds_count'); // кол-во птиц, которые несут яйца
            $table->unsignedFloat('price'); // цена одного яйца
            $table->unsignedInteger('demand'); // спрос - сколько за час можно продавать яиц
            $table->unsignedBigInteger('litter'); // кол-во помета
            $table->unsignedFloat('count'); // кол-во яиц
            $table->boolean('collected')->default(0); // собраны ли яйца в этом часу
            $table->boolean('cared')->default(0); // собраны ли яйца в этом часу
            $table->foreignId('user_id');
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
