<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GithubRepo extends Model
{
    protected $table = 'github_repos';

    protected $fillable = [
        self::COLUMN_FULL_NAME,
        self::COLUMN_DESCRIPTION
    ];

    public const COLUMN_ID          = 'id';
    public const COLUMN_FULL_NAME   = 'full_name';
    public const COLUMN_DESCRIPTION = 'description';

    public function githubIssue()
    {
        $this->hasMany(GithubIssue::class, GithubIssue::COLUMN_REPO_ID, self::COLUMN_ID);
    }
}
