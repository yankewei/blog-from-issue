<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GithubController extends Controller
{
    public function callback(Request $request)
    {
    }

    public function oauth(Request $request)
    {
        $query = [
            'client_id' => config('services.github.client_id'),
            'redirect_uri' => config('services.github.redirect_uri'),
            'scope' => 'read:project',
            'state' => Str::random()
        ];

        return redirect("https://github.com/login/oauth/authorize?" . http_build_query($query));
    }
}
