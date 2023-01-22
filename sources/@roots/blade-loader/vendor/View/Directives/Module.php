<?php

namespace App\View\Directives;

class Module
{
    /**
     * Invoke the @module directive.
     *
     * @param  string $view
     * @return string
     */
    public function __invoke($view)
    {
        return sprintf("<?php %s(%s)->enqueue(); ?><!--", '\Roots\bundle', $view);
    }
}
