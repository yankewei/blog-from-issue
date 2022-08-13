<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $repo }} 's issues</title>
</head>
<body>
<ul>
    @foreach($issues as $issue)
        <li>
            <a href="/{{ $login }}/{{ $repo }}/issues/{{ $issue['number'] }}">{{ $issue['title'] }}</a>
            @if(count($issue['labels']) !== 0)

            标签: @foreach($issue['labels'] as $label)
                    @if ($loop->last)
                        {{ $label['name'] }}
                    @else
                        {{ $label['name'] }}
                    @endif
                 @endforeach
            @endif
        </li>
    @endforeach
</ul>
</body>
</html>
