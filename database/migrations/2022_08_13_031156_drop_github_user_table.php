<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::drop('github_user');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('github_user', function (Blueprint $table) {
            $table->tinyInteger('id')->autoIncrement();
            $table->char('username', 50)->nullable(false);
            $table->string('head_url', 100);
            $table->json('authentication');
            $table->timestamps();
        });
    }
};
