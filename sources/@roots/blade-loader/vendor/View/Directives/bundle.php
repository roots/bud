<?php

namespace App\View\Directives;

class Bundle
{
    public function __invoke($bundleName)
    {
        return sprintf("<?php %s(%s)->enqueue(); ?>", '\Roots\bundle', $bundleName);
    }
}
