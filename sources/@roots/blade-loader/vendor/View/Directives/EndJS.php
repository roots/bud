<?php

namespace App\View\Directives;

class EndJS
{
    /**
     * Invoke the @endjs directive.
     *
     * @return string
     */
    public function __invoke()
    {
        return "-->";
    }
}
