<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static string getLogin()
 * @method static array getUser()
 * @method static array getUserRepos()
 * @method static array getRepoIssues(string $repo_name)
 * @method static array getIssue(string $repo, int $number)
 * @method static array getIssueComments(string $repo, int $number)
 */
class Github extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \App\Services\Github::class;
    }
}
