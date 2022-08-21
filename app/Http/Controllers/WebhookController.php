<?php

namespace App\Http\Controllers;

use App\Models\GithubIssue;
use App\Models\GithubIssueComment;
use App\Models\GithubRepo;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use LogicException;

class WebhookController extends Controller
{
    private const ACTION_OPENED       = 'opened';
    private const ACTION_CREATED      = 'created';
    private const EVENT_ISSUES        = 'issues';
    private const EVENT_ISSUE_COMMENT = 'issue_comment';

    public function post(Request $request)
    {
        $hash = substr($request->header('X-Hub-Signature-256'), 7);

        if (!hash_equals($hash, hash_hmac('sha256', file_get_contents('php://input'), config('services.github.webhook_secret')))) {
            return response('Request Error', Response::HTTP_BAD_REQUEST);
        }

        $event = $request->header('X-GitHub-Event');
        $action = $request->input('action');

        if ($event === self::EVENT_ISSUES && $action === self::ACTION_OPENED) {
            return $this->createIssue($request);
        }

        if ($event === self::EVENT_ISSUE_COMMENT && $action === self::ACTION_CREATED) {
            return $this->createIssueComment($request);
        }

        return response('Cannot handle event', Response::HTTP_OK);
    }

    private function createIssue(Request $request): Response
    {
        $repository = $request->input('repository');
        $issue = $request->input('issue');

        $repo_full_name = $repository['full_name'];

        $github_repo = GithubRepo::where(GithubRepo::COLUMN_FULL_NAME, $repo_full_name)->first();

        if ($github_repo === null) {
            $github_repo = GithubRepo::create([
                GithubRepo::COLUMN_FULL_NAME => $repo_full_name,
                GithubRepo::COLUMN_DESCRIPTION => $repository['description'],
            ]);
        }

        GithubIssue::create([
            GithubIssue::COLUMN_REPO_ID => $github_repo->id,
            GithubIssue::COLUMN_NUMBER => $issue['number'],
            GithubIssue::COLUMN_TITLE => $issue['title'],
            GithubIssue::COLUMN_CONTENT => $issue['body']
        ]);

        return response("Successful create issue", Response::HTTP_OK);
    }

    private function createIssueComment(Request $request): Response
    {
        $comment = $request->input('comment');
        $issue   = $request->input('issue');
        $repository = $request->input('repository');

        $repo_full_name = $repository['full_name'];

        $github_repo = GithubRepo::where(GithubRepo::COLUMN_FULL_NAME, $repo_full_name)->first();

        if ($github_repo === null) {
            throw new LogicException('Cannot find the repo in our db');
        }

        $github_issue = GithubIssue::getGithubIssueGivenRepoIdAndNumber($github_repo->id, $issue['number']);

        if ($github_issue === null) {
            throw new LogicException('Cannot find the issue in our db');
        }

        GithubIssueComment::create([
            GithubIssueComment::COLUMN_ISSUE_ID => $github_issue->id,
            GithubIssueComment::COLUMN_CONTENT  => $comment['body']
        ]);

        return response("Successful create issue comment", Response::HTTP_OK);
    }
}
