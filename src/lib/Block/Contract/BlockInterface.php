<?php

namespace Roots\Bud\Block\Contract;

/**
 * Block class interface.
 */
interface BlockInterface
{
    public function get($id);

    public function set($id, $value): void;

    public function has($id): bool;
}
