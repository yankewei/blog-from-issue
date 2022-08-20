<?php

namespace App\Console\Commands\Github;

use App\Facades\Github;
use App\Models\GithubIssue;
use App\Models\GithubIssueComment;
use App\Models\GithubIssueLabel;
use App\Models\GithubLabel;
use App\Models\GithubRepo;
use App\Models\GithubUser;
use Illuminate\Console\Command;
use Arr;
use Illuminate\Support\Facades\DB;

class ImportDataFromGithub extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'github:import-data-from-github';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        DB::transaction(function () {
            $this->addGithubUser();
            $this->addIssueAndLabels();
        });

        return self::SUCCESS;
    }

    private function addGithubUser(): void
    {
        $this->info('Start to import github user');
        $user = Github::getUser();

        $github_user = GithubUser::where(GithubUser::COLUMN_LOGIN, $user['login'])->first();

        if ($github_user === null) {
            GithubUser::create([
                GithubUser::COLUMN_LOGIN => $user['login'],
                GithubUser::COLUMN_AVATAR_URL => $user['avatar_url'],
            ]);
        }
    }

    private function addIssueAndLabels(): void
    {
        $this->info('Start to import repos');
        $repos = Github::getUserRepos();

        foreach ($repos as $repo) {
            $github_repo = GithubRepo::where(GithubRepo::COLUMN_FULL_NAME, $repo['full_name'])->first();

            if ($github_repo === null) {
                $github_repo = GithubRepo::create([
                    GithubRepo::COLUMN_FULL_NAME   => $repo['full_name'],
                    GithubRepo::COLUMN_DESCRIPTION => $repo['description'] ?? ''
                ]);
            }

            $this->info('Start to import issues');
            $issues = Github::getRepoIssues($repo['name']);

            foreach ($issues as $issue) {
                $github_label_ids = [];

                $this->info('Start to import labels');
                foreach ($issue['labels'] as $label) {
                    $github_label = GithubLabel::where(GithubLabel::COLUMN_NAME, $label['name'])->first();

                    if ($github_label === null) {
                        $github_label = GithubLabel::create([
                            GithubLabel::COLUMN_NAME => $label['name'],
                            GithubLabel::COLUMN_COLOR => $label['color'],
                            GithubLabel::COLUMN_DESCRIPTION => $label['description']
                        ]);
                    }

                    $github_label_ids[] = $github_label->id;
                }

                $github_issue = GithubIssue::where(GithubIssue::COLUMN_REPO_ID, $github_repo->id)
                    ->where(GithubIssue::COLUMN_NUMBER, $issue['number'])->first();

                if ($github_issue === null) {
                    $github_issue = GithubIssue::create([
                        GithubIssue::COLUMN_REPO_ID => $github_repo->id,
                        GithubIssue::COLUMN_NUMBER  => $issue['number'],
                        GithubIssue::COLUMN_TITLE => $issue['title'],
                        GithubIssue::COLUMN_CONTENT => $issue['body'],
                    ]);
                }

                foreach ($github_label_ids as $github_label_id) {
                    $github_issue_label = GithubIssueLabel::where(GithubIssueLabel::COLUMN_ISSUE_ID, $github_issue->id)
                        ->where(GithubIssueLabel::COLUMN_LABEL_ID, $github_label_id)
                        ->first();

                    if ($github_issue_label === null) {
                        GithubIssueLabel::create([
                            GithubIssueLabel::COLUMN_ISSUE_ID => $github_issue->id,
                            GithubIssueLabel::COLUMN_LABEL_ID => $github_label_id
                        ]);
                    }
                }

                $this->info('Start to import issue comments');
                $issue_comments = Github::getIssueComments($repo['name'], $github_issue->number);

                foreach ($issue_comments as $issue_comment) {
                    GithubIssueComment::create([
                        GithubIssueComment::COLUMN_ISSUE_ID => $github_issue->id,
                        GithubIssueComment::COLUMN_CONTENT  => $issue_comment['body']
                    ]);
                }
            }
        }
    }
}
