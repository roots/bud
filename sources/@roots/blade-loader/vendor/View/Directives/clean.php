<?php

namespace App\View\Directives;

class Clean
{
    public function __invoke()
    {
        return "<?php ob_end_clean(); ?>";
    }
}
