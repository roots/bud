<?php

namespace App\View\Directives;

class EndModule
{
    public function __invoke()
    {
        return "<?php ob_end_clean(); ?>";
    }
}
