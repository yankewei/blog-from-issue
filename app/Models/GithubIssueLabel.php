<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class GithubIssueLabel extends Model
{
    protected $table = self::TABLE_NAME;

    protected $fillable = [
        self::COLUMN_ISSUE_ID,
        self::COLUMN_LABEL_ID
    ];

    public const TABLE_NAME = 'github_issue_label';

    public const COLUMN_ISSUE_ID = 'issue_id';
    public const COLUMN_LABEL_ID = 'label_id';
}
