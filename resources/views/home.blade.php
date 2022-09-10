<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $login }}'s blog</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
    <div class="border">
        <div class="col-6 p-2 mx-auto border">
            @foreach ($issues as $issue)
                <p class="color-fg-muted p-1">
                    <a class="Link--primary" href="/issues/{{ $issue->id }}">{{ $issue->title }}</a>
                </p>
            @endforeach
            {{ $issues->links() }}
        </div>

    </div>
</body>
</html>
