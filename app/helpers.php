<?php

if (!function_exists('parseMarkdown')) {
    function parseMarkdown(string $markdown): string
    {
        return (new Parsedown())->parse($markdown);
    }
}
