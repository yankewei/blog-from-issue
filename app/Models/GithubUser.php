<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GithubUser extends Model
{
    protected $table = 'github_user';

    protected $fillable = [
        self::COLUMN_LOGIN,
        self::COLUMN_AVATAR_URL
    ];

    public const COLUMN_LOGIN = 'login';
    public const COLUMN_AVATAR_URL = 'avatar_url';
}
