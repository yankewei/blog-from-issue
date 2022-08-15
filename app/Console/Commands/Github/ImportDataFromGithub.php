<?php

namespace App\Console\Commands\Github;

use App\Facades\Github;
use App\Models\GithubRepo;
use App\Models\GithubUser;
use Illuminate\Console\Command;

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
        $this->addGithubUser();
        $this->addRepo();
        return self::SUCCESS;
    }

    private function addGithubUser(): void
    {
        $user = Github::getUser();

        GithubUser::create([
            GithubUser::COLUMN_LOGIN => $user['login'],
            GithubUser::COLUMN_AVATAR_URL => $user['avatar_url'],
        ]);
    }

    private function addRepo(): void
    {
        $repos = Github::getUserRepos();

        foreach ($repos as $repo) {
            GithubRepo::create([
                GithubRepo::COLUMN_FULL_NAME   => $repo['full_name'],
                GithubRepo::COLUMN_DESCRIPTION => $repo['description'] ?? ''
            ]);
        }
    }

    private function addIssueAndLabels(): void
    {
        $repos = Github::getUserRepos();

        foreach ($repos as $repo) {
            GithubRepo::create([
                GithubRepo::COLUMN_FULL_NAME   => $repo['full_name'],
                GithubRepo::COLUMN_DESCRIPTION => $repo['description'] ?? ''
            ]);

            $issues = Github::getRepoIssues($repo['name']);
        }
    }
}
