<?php

namespace Roots\Bud\Container\Contracts;

use Psr\Container\ContainerInterface as PsrContainerInterface;

/**
 * Container Interface.
 *
 * @package Roots\Bud
 * @author  Kelly Mears
 */
interface ContainerInterface extends PsrContainerInterface
{
    /**
     * Get
     *
     * @param  string $id
     * @return mixed
     */
    public function get($id);

    /**
     * Set
     *
     * @param  string $id
     * @return mixed
     */
    public function set($id, $value);

    /**
     * Has
     *
     * @param  string $id
     * @return Boolean
     */
    public function has($id);
}
