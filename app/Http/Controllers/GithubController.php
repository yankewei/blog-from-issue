<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class GithubController extends Controller
{
    const GITHUB_STATE = 'github_state';

    public function callback(Request $request)
    {
        if (Cache::get(self::GITHUB_STATE) !== $request->input('state')) {
            throw new AccessDeniedHttpException('You request is timeout, please rend a request from Github.');
        }

        $response = Http::withHeaders(['Accept' => 'application/json'])->post('https://github.com/login/oauth/access_token', [
            'client_id' => config('services.github.client_id'),
            'client_secret' => config('services.github.client_secret'),
            'code' => $request->input('code'),
            'redirect_uri' => config('services.github.redirect_uri')
        ]);

    }

    public function oauth(Request $request)
    {
        $query = [
            'client_id' => config('services.github.client_id'),
            'redirect_uri' => config('services.github.redirect_uri'),
            'scope' => 'read:project',
            'state' => Cache::remember(self::GITHUB_STATE, 300, function () {
                return Str::random();
            }),
        ];

        return redirect("https://github.com/login/oauth/authorize?" . http_build_query($query));
    }
}
