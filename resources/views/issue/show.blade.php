<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $issue->title }}</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/github.min.css') }}">
    <script src="{{ asset('js/highlight.min.js') }}"></script>
    <script src="{{ asset('js/markdown.min.js') }}"></script>
    <script>hljs.highlightAll();</script>
</head>
<body>
    <div class="border">
        <div class="col-6 p-2 mx-auto">
            <p class="h3">{{ $issue->title }}</p>
        </div>

        @if($issue->labels->count() !== 0)
            <div class="col-6 p-2 mx-auto">
                @foreach($issue->labels as $label)
                    <span class="Label Label--primary ml-1">{{ $label->name }}</span>
                @endforeach
                <span class="Label Label--primary ml-1">Primary</span>
            </div>
        @endif

        <div class="col-6 p-2 mx-auto">
            {!! parseMarkdown($issue->content) !!}
            @if($issue->comments->count() !== 0)
                @foreach($issue->comments as $comment)
                    {!! parseMarkdown($comment->content) !!}
                @endforeach
            @endif
        </div>
    </div>
</body>
</html>
