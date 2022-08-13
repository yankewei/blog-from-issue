<?php

namespace App\Http\Controllers;

use App\Facades\Github;

final class HomeController extends Controller
{
    public function home()
    {
        $repos = Github::getUserRepos();

        return view('home', ['login' => Github::getLogin(), 'repos' => $repos]);
    }
}
