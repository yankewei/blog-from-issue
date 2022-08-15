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
        Schema::create('github_issue_labels', function (Blueprint $table) {
            $table->mediumInteger('id', true, true);
            $table->smallInteger('issue_id', false, true)->nullable(false)->index('index_issue_id');
            $table->smallInteger('label_id', false, true)->nullable(false)->index('index_label_id');
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
        Schema::dropIfExists('github_issue_labels');
    }
};
