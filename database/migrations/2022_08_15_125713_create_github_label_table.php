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
        Schema::create('github_label', function (Blueprint $table) {
            $table->smallInteger('id', true, true);
            $table->char('name', 50)->nullable(false)->unique('unique_name');
            $table->char('color', 6)->default('ffffff');
            $table->string('description', 50);
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
        Schema::dropIfExists('github_label');
    }
};
