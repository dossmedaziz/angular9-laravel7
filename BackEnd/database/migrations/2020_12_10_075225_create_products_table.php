<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('products', function (Blueprint $table) {
            $table->id() ; 
            $table->string('name');
            $table->string('subtitle');
            $table->text('description');
            $table->integer('price');
            $table->integer('qte');
            $table->boolean('confirmed')->default(false);        
            $table->string('picture');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDELETE('cascade');
                $table->unsignedBigInteger('category_id');
                $table->foreign('category_id')
                    ->references('id')
                    ->on('categories')
                    ->onDELETE('cascade');
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
     /*   Schema::dropIfExists('products');*/
    }
}
