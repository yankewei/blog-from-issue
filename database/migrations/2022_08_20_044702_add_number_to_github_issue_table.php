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
        Schema::table('github_issues', function (Blueprint $table) {
            $table->smallInteger('number', false, true)->after('repo_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('github_issue', function (Blueprint $table) {
            $table->removeColumn('number');
        });
    }
};
