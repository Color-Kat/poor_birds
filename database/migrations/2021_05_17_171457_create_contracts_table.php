<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // название контракта (контракт с трактористом)
            $table->text('description'); // описание
            $table->text('image'); // картинка
            $table->string('script_name'); // название скрипта (tractor_driver_uncle_Kolya)
            $table->string('payload'); // полезная нагрузка (бонус, время и тд)
            $table->integer('price'); // цена контракта
            $table->boolean('isDonate'); // цена контракта
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
        Schema::dropIfExists('contracts');
    }
}
