<?php

namespace Roots\Bud\Services\Contracts;

use Roots\Bud\Container\Contracts\ContainerInterface;

/**
 * Service provider interface.
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
interface ServiceProviderInterface
{
    /**
     * Class constructor.
     *
     * @param ContainerInterface
     */
    public function __construct(ContainerInterface $bud);

    /**
      * Register plugin service.
      *
      * @return void
      */
    public function register();

    /**
      * Register boot service.
      *
      * @return void
      */
    public function boot();
}
