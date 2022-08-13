<?php

namespace App\Http\Controllers;

use App\Facades\Github;

class IssueController extends Controller
{
    public function index(string $login, string $repo)
    {
        $issues = Github::getRepoIssues($repo);

        return view('issue.index', ['login' => $login, 'repo' => $repo, 'issues' => $issues]);
    }

    public function show(string $login, string $repo, int $number)
    {
        $issue = Github::getIssue($repo, $number);

        return view('issue.show', ['issue' => $issue]);
    }
}
