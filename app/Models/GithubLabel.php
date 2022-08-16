<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int id
 * @property string name
 * @property string color
 * @property string description
 */
final class GithubLabel extends Model
{
    protected $table = self::TABLE_NAME;

    protected $fillable = [
        self::COLUMN_NAME,
        self::COLUMN_COLOR,
        self::COLUMN_DESCRIPTION
    ];

    public const TABLE_NAME    = 'github_labels';
    public const COLUMN_NAME   = 'name';
    public const COLUMN_COLOR  = 'color';
    public const COLUMN_DESCRIPTION = 'description';

    public function githubIssue()
    {
        $this->belongsToMany(GithubIssue::class, GithubIssueLabel::TABLE_NAME, GithubIssueLabel::COLUMN_LABEL_ID, GithubIssueLabel::COLUMN_ISSUE_ID);
    }
}
