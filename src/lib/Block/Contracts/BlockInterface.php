<?php

namespace Roots\Bud\Block\Contract;

/**
 * Block interface.
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
interface BlockInterface
{
    public function get($id);

    public function set($id, $value): void;

    public function has($id): bool;
}
