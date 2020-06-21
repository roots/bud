<?php

namespace Roots\Bud\Collection\Contracts;

/**
 * Jsonable interface.
 *
 * Adapted from Illuminate\Contracts\Support\Jsonable
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
interface Jsonable
{
    /**
     * Convert the object to its JSON representation.
     *
     * @param  int  $options
     * @return string
     */
    public function toJson($options = 0);
}
