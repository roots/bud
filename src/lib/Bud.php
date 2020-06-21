<?php

namespace Roots\Bud;

use Roots\Bud\Collection\Collection;
use Roots\Bud\Container\Container;
use Roots\Bud\Container\Contracts\ContainerInterface;
use Roots\Bud\Services\ServiceProvider;
use Roots\Bud\Services\Contracts\ServiceProviderInterface;

/**
 * Bud bootstrap.
 *
 * This class
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
class Bud
{
    /** @var object Container */
    protected $bud;

    /** @var string plugin baseDir */
    protected $dir;

    /** @var object plugin raw config */
    protected $config;

    /** @var array services */
    protected $services = [
        ContainerInterface::class => Container::class,
        ServiceProviderInterface::class => ServiceProvider::class,
    ];

    /**
     * Bootstrap constructor.
     *
     * @param string $dir plugin base directory
     */
    public function __construct(string $dir)
    {
        $this->dir = $dir;

        $this->bud = new Container;

        $this->config = (object) [
            'plugin' => (object) include realpath(
                join('/', [$this->dir, 'config/plugin.php'])
            ),
            'services' => (object) include realpath(
                join('/', [$this->dir, 'config/services.php'])
            ),
        ];
    }

    /**
     * Bootstrap the plugin container.
     *
     * @return Container
     */
    public function __invoke(): Container
    {
        $this->config();
        $this->register();
        $this->boot();

        return $this->bud;
    }

    /**
     * Configure the plugin container.
     *
     * @return void
     */
    protected function config(): void
    {
        $this->bud->set('url', $this->config->plugin->url);

        $this->bud->set('directories', (object) array_merge(
            $this->config->plugin->directories,
            ['base' => $this->dir]
        ));

        $this->bud->set('files', (object) array_map(
            [$this, 'pluginPath'],
            $this->config->plugin->files
        ));

        $this->bud->set('wordpress', (object) [
            'content' => WP_CONTENT_DIR,
            'plugins' => realpath($this->dir . '/../'),
        ]);
    }

    /**
     * Register the plugin container services.
     *
     * @return void
     */
    protected function register(): void
    {
        $this->bud->set('hooks', Collection::make(
            $this->config->services->service_hooks
        ));

        Collection::make($this->config->services->services)->each(
            function ($service, $key) {
                $this->bud->set($key, $service);
            }
        );

        Collection::make($this->services)->each(
            function ($implementation, $interface) {
                $this->bud->set($interface, $implementation);
            }
        );

        Collection::make($this->config->services->autoload)->each(
            function ($service, $key) {
                $this->bud->set($key, new $service($this->bud));

                if (method_exists($this->bud[$key], 'register')) {
                    $this->bud[$key]->register();
                }
            }
        );
    }

    /**
     * Boot the plugin container services.
     *
     * @return void
     */
    protected function boot(): void
    {
        Collection::make($this->config->services->autoload)->each(
            function ($service, $key) {
                if (method_exists($this->bud[$key], 'boot')) {
                    $this->bud[$key]->boot();
                }
            }
        );
    }

    /**
     * Make plugin absolute path from a relative path.
     *
     * @param string $path path relative to plugin root.
     * @return string absolute path
     */
    protected function pluginPath(string $path): string
    {
        return realpath(join('/', [$this->dir, $path]));
    }
}
