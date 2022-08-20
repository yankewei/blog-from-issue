<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $issue->title }}</title>
</head>
<body>
<h3>{{ $issue->title }}</h3>

@if($issue->labels->count() !== 0)
    <p>
        @foreach($issue->labels as $label)
            @if ($loop->last)
                {{ $label->name }}
            @else
                {{ $label->name }}
            @endif
        @endforeach
    </p>
@endif

<section>
    {!! parseMarkdown($issue->content) !!}
    @if($issue->comments->count() !== 0)
        @foreach($issue->comments as $comment)
            {!! parseMarkdown($comment->content) !!}
        @endforeach
    @endif
</section>
</body>
</html>
