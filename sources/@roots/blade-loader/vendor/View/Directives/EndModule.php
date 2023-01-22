<?php

namespace App\View\Directives;

class EndModule
{
    /**
     * Invoke the @endmodule directive.
     *
     * @return string
     */
    public function __invoke()
    {
        return "-->";
    }
}
