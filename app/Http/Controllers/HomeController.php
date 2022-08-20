<?php

namespace App\Http\Controllers;

use App\Facades\Github;
use App\Models\GithubIssue;

final class HomeController extends Controller
{
    public function home()
    {
        $issues = GithubIssue::paginate(20);

        return view('home', ['login' => Github::getLogin(), 'issues' => $issues]);
    }
}
