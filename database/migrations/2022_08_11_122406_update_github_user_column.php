<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('github_user', function (Blueprint $table) {
            $table->char('login', 50)->nullable(false);
            $table->renameColumn('head_url', 'avatar_url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('github_user', function (Blueprint $table) {
            $table->renameColumn('avatar_url', 'head_url');
            $table->dropColumn('login');
        });
    }
};
