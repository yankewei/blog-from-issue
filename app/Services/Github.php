<?php

namespace App\Services;

use Arr;
use Exception;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Log;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;

class Github
{
    public function __construct(private string $pat, private string $login)
    {
    }

    public function getLogin(): string
    {
        return $this->login;
    }

    /**
     * @return array{login:string,avatar_url:string}
     * @throws Exception
     */
    public function getUser(): array
    {
        $user = $this->call('users/' . $this->login, Request::METHOD_GET);

        return [
            'login'      => $user['login'],
            'avatar_url' => $user['avatar_url'],
        ];
    }

    /**
     * @return array{id:int,html_url:string,name:string,full_name:string,description:string,create_at:string,updated_at:string,pushed_at:string}
     * @throws Exception
     */
    public function getUserRepos(): array
    {
        $repos = $this->call('user/repos', Request::METHOD_GET, ['sort' => 'created_at', 'direction' => 'desc']);
        return collect($repos)->map(function (array $repo) {
            return Arr::only($repo, ['id', 'html_url', 'name','full_name', 'description', 'owner', 'created_at', 'updated_at', 'pushed_at']);
        })->toArray();
    }

    /**
     * @param string $repo
     * @return array{id:int,html_url:string,title:string,labels:array{int,array{name:string}},create_at:string,updated_at:string}
     * @throws Exception
     */
    public function getRepoIssues(string $repo): array
    {
        $collection = new Collection();

        $page = 1;
        $per_page = 20;

        while (true) {
            $issues = $this->call(
                'repos/' . $this->login . '/' . $repo . '/issues',
                Request::METHOD_GET,
                [
                    'sort' => 'created_at',
                    'direction' => 'desc',
                    'page' => $page,
                    'per_page' => $per_page
                ]
            );

            if (count($issues) < $per_page) {
                break;
            }

            $collection = $collection->merge($issues);
            $page++;
        }

        return $collection->map(function (array $issue) {
            return Arr::only($issue, ['id', 'number', 'html_url', 'title', 'labels', 'created_at', 'updated_at']);
        })->toArray();
    }

    /**
     * @param string $repo
     * @param int $number
     * @return array{
     *     id:int,
     *     title:string,
     *     number:int,
     *     labels:
     *       array{int,array{name:string}},
     *     created_at:string,
     *     updated_at:string,
     *     body:string,
     *     comments:
     *       array{id:int,html_url:string,created_at:string,updated_at:string,body:string}
     *   }
     * @throws Exception
     */
    public function getIssue(string $repo, int $number): array
    {
        $issue = $this->call('repos/' . $this->login . '/' . $repo . '/issues/' . $number, Request::METHOD_GET);

        $issue['comments'] = $this->getIssueComments($repo, $number);

        return Arr::only($issue, ['id', 'title', 'number', 'labels', 'created_at', 'updated_at', 'body', 'comments']);
    }

    /**
     * @param string $repo
     * @param string $issue_number
     * @return array{id:int,html_url:string,created_at:string,updated_url:string,body:string}
     * @throws Exception
     */
    public function getIssueComments(string $repo, string $issue_number): array
    {
        $comments = $this->call(
            'repos/' . $this->login . '/' . $repo . '/issues/' . $issue_number . '/comments',
            Request::METHOD_GET,
        );

        return collect($comments)->map(function (array $comment) {
            return Arr::only($comment, ['id', 'html_url', 'created_at', 'updated_at', 'body']);
        })->toArray();
    }



    private function call(string $relative_uri, string $method, array $parameters = []): array
    {
        $absolute_uri = 'https://api.github.com' . '/' . ltrim($relative_uri, '/');

        $header = [
            'Accept' => 'application/vnd.github+json',
            'Authorization' => 'token '. $this->pat
        ];

        $pending_request = Http::withHeaders($header);

        try {
            if ($method === Request::METHOD_GET) {
                $response = $pending_request->get($absolute_uri, $parameters);
            } else {
                $response = $pending_request->post($absolute_uri, $parameters);
            }

            $response->onError(function (Response $response) {
                if ($response->clientError()) {
                    throw new BadRequestHttpException('The request is error', $response->toException());
                } elseif ($response->serverError()) {
                    throw new ServiceUnavailableHttpException(300, 'Server is unavailable', $response->toException());
                } else {
                    throw new Exception('Unknown exception occurred', ResponseAlias::HTTP_INTERNAL_SERVER_ERROR, $response->toException());
                }
            });

            if ($response->successful()) {
                return json_decode($response->body(), true);
            }
        } catch (ConnectionException $connection_exception) {
            Log::error('Failed to connect the github', ['message' => $connection_exception->getMessage()]);
            return [];
        }

        return [];
    }
}
