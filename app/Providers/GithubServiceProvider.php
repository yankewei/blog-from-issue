<?php

namespace App\Providers;

use App\Services\Github;
use Illuminate\Support\ServiceProvider;

class GithubServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Github::class, function ($app): Github {
            $config = config('services.github');
            return new Github($config['pat'], $config['login']);
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    public function provides()
    {
        return [Github::class];
    }
}
