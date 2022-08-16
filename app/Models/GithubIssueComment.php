<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GithubIssueComment extends Model
{
    protected $table = self::TABLE_NAME;

    protected $fillable = [
        self::COLUMN_ISSUE_ID,
        self::COLUMN_CONTENT
    ];

    public const TABLE_NAME = 'github_issue_comments';

    public const COLUMN_ID  = 'id';
    public const COLUMN_ISSUE_ID = 'issue_id';
    public const COLUMN_CONTENT = 'content';

    public function issue()
    {
        $this->belongsTo(GithubIssue::class, GithubIssue::COLUMN_ID, self::COLUMN_ISSUE_ID);
    }
}
