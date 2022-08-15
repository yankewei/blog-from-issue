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
        Schema::create('github_issue', function (Blueprint $table) {
            $table->smallInteger('id', true, true);
            $table->tinyInteger('repo_id', false, true)->nullable(false)->index('index_repo_id');
            $table->string('title', 255)->nullable(false);
            $table->text('content');
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
        Schema::dropIfExists('github_issue');
    }
};
