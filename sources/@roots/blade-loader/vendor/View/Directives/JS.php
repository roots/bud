<?php

namespace App\View\Directives;

class JS
{
    /**
     * Invoke the @js directive.
     *
     * @param  string $view
     * @return string
     */
    public function __invoke($view)
    {
        return sprintf("<?php %s(%s)->enqueue(); ?><!--", '\Roots\bundle', $view);
    }
}
