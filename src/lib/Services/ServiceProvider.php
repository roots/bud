<?php

namespace Roots\Bud\Services;

use Roots\Bud\Container\Contracts\ContainerInterface;
use Roots\Bud\Services\Contracts\ServiceProviderInterface;

/**
 * Bud Service Provider.
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
class ServiceProvider implements ServiceProviderInterface
{
    /**
     * Instantiate service.
     *
     * @return void
     */
    public function __construct(ContainerInterface $bud)
    {
        $this->bud = $bud;

        $this->bud['hooks']->each(function($method, $hook) {
            method_exists($this, $method) && add_action($hook, [$this, $method]);
        });
    }

    /**
     * Register plugin service.
     *
     * @return void
     */
    public function register()
    {
        // --
    }

    /**
     * Boot plugin service.
     *
     * @return void
     */
    public function boot()
    {
        // --
    }

    /**
     * Read JSON.
     *
     * @param  string $path
     * @return object
     */
    public function json(string $path): object
    {
        return json_decode(file_get_contents($path));
    }
}
