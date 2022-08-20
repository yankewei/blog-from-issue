<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class GithubIssue extends Model
{
    protected $table = 'github_issues';

    protected $fillable= [
        self::COLUMN_REPO_ID,
        self::COLUMN_NUMBER,
        self::COLUMN_TITLE,
        self::COLUMN_CONTENT
    ];

    public const COLUMN_ID      = 'id';
    public const COLUMN_REPO_ID = 'repo_id';
    public const COLUMN_NUMBER  = 'number';
    public const COLUMN_TITLE   = 'title';
    public const COLUMN_CONTENT = 'content';

    public function repo()
    {
        return $this->belongsTo(GithubRepo::class, GithubRepo::COLUMN_ID, self::COLUMN_REPO_ID);
    }

    public function labels()
    {
        return $this->belongsToMany(
            GithubLabel::class,
            GithubIssueLabel::TABLE_NAME,
            GithubIssueLabel::COLUMN_ISSUE_ID,
            GithubIssueLabel::COLUMN_LABEL_ID
        );
    }

    public function comments()
    {
        return $this->hasMany(
            GithubIssueComment::class,
            GithubIssueComment::COLUMN_ISSUE_ID,
            self::COLUMN_ID
        );
    }
}
