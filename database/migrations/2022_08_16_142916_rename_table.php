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
        Schema::rename('github_user', 'github_users');
        Schema::rename('github_repo', 'github_repos');
        Schema::rename('github_issue', 'github_issues');
        Schema::rename('github_issue_comment', 'github_issue_comments');
        Schema::rename('github_label', 'github_labels');
        Schema::rename('github_issue_labels', 'github_issue_label');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('github_users', 'github_user');
        Schema::rename('github_repos', 'github_repo');
        Schema::rename('github_issues', 'github_issue');
        Schema::rename('github_issue_comments', 'github_issue_comment');
        Schema::rename('github_labels', 'github_label');
        Schema::rename('github_issue_label', 'github_issue_labels');
    }
};
