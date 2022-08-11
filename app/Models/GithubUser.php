<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GithubUser extends Model
{
    protected $table = 'github_user';

    public const COLUMN_AUTHENTICATION = 'authentication';
    public const COLUMN_AVATAR_URL     = 'avatar_url';
    public const COLUMN_LOGIN          = 'login';
    public const COLUMN_USERNAME       = 'username';

    protected $fillable = [
        self::COLUMN_AUTHENTICATION,
        self::COLUMN_AVATAR_URL,
        self::COLUMN_LOGIN,
        self::COLUMN_USERNAME,
    ];

    protected $casts = [
        'authentication' => 'json'
    ];
}
