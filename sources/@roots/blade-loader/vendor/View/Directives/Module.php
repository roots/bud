<?php

namespace App\View\Directives;

class Module
{
    public function __invoke()
    {
        return "<?php ob_start(); ?>";
    }
}
