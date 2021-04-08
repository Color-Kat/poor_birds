<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSellersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('');
            $table->text('image')->nullable();
            $table->text('description')->nullable();

            // id сертификата, который идет с проданными птицами
            $table->integer('certificate_id')->default(0);

            // бонус на спрос в процентах +/-
            $table->mediumInteger('demand')->default(0);

            // бонус на цену в процентах +/-
            $table->mediumInteger('discount')->default(0);

            // Кол-во птиц у игрока ,чтобы получить доступ к продавцу
            $table->mediumInteger('birds_count')->default(0);

            // Цена договора, чтобы получить доступ к продавцу
            $table->mediumInteger('price')->default(0);

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
        Schema::dropIfExists('sellers');
    }
}
