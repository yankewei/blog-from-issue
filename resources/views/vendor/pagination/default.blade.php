@if ($paginator->hasPages())
    <nav class="paginate-container" aria-label="Pagination">
        <ul class="pagination">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <span class="previous_page" aria-disabled="true">@lang('pagination.previous')</span>
            @else
                <a class="previous_page" rel="previous" href="{{ $paginator->previousPageUrl() }}" aria-label="Previous Page">Previous</a>
            @endif

            {{-- Pagination Elements --}}
            @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if (is_string($element))
                    <span class="gap">{{ $element }}</span>
                @endif

                {{-- Array Of Links --}}
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <em aria-current="page">{{ $page }}</em>
                        @else
                            <a href="{{ $url }}" aria-label="Page {{ $page }}">{{ $page }}</a>
                        @endif
                    @endforeach
                @endif
            @endforeach

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <a class="next_page" rel="next" href="{{ $paginator->nextPageUrl() }}" aria-label="Next Page">Next</a>
            @else
                <span class="next_page" rel="next" aria-disabled="true">Next</span>
            @endif
        </ul>
    </nav>
@endif
