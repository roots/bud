<?php

namespace App\View\Directives;

class Capture
{
    public function __invoke()
    {
        return "<?php ob_start(); ?>";
    }
}
