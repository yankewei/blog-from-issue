<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GithubRepo extends Model
{
    protected $table = 'github_repo';

    protected $fillable = [
        self::COLUMN_FULL_NAME,
        self::COLUMN_DESCRIPTION
    ];

    public const COLUMN_FULL_NAME   = 'full_name';
    public const COLUMN_DESCRIPTION = 'description';
}
