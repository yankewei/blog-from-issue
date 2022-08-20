<?php

namespace App\Http\Controllers;

use App\Facades\Github;
use App\Models\GithubIssue;

class IssueController extends Controller
{
    public function show(string $id)
    {
        $issue = GithubIssue::with(['labels', 'comments'])->findOrFail($id);

        return view('issue.show', ['issue' => $issue]);
    }
}
