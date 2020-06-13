<?php

/**
 * The bootstrap file creates and returns the plugin container.
 */

namespace Roots\Bud;

use function DI\autowire;
use function DI\create;

use DI\ContainerBuilder;
use Psr\Container\ContainerInterface;

/**
 * Config
 */
$config = (object) [
    'plugin' => (object) require realpath(join('/', [$dir, 'config/plugin.php'])),
    'bindings' => require realpath(join('/', [$dir, 'config/bindings.php'])),
    'block' => (object) require realpath(join('/', [$dir, 'config/block.php'])),
];

/**
 * Dynamic bindings
 */
$projectClasses = (object) [
    'activate' => "{$config->plugin->namespace}\\Plugin\\Activate",
    'deactivate' => "{$config->plugin->namespace}\\Plugin\\Deactivate",
    'main' => "{$config->plugin->namespace}\\Plugin\\Main",
    'registration' => "{$config->plugin->namespace}\\Asset\\Registration",
];

/**
 * Build the container instance
 */
return (new ContainerBuilder)->addDefinitions([
    \Roots\Bud\Plugin\Init::class => autowire(\Roots\Bud\Plugin\Init::class),
    'plugin.init' => autowire(\Roots\Bud\Plugin\Init::class),

    \Roots\Bud\Block\Contract\BlockInterface::class => autowire(\Roots\Bud\Block\Block::class),
    'block' => autowire(\Roots\Bud\Block\Block::class),

    \Roots\Bud\Asset\Contract\CollectionInterface::class => function (ContainerInterface $bud) {
        return \Roots\Bud\Asset\Collection::make()->fromFile($bud, '/dist/manifest.json');
    },
    'asset' => autowire(\Roots\Bud\Asset\Collection::class),

    /**
     * Vendor
     */
    Illuminate\Support\Collection::class => autowire(Illuminate\Support\Collection::class),
    'collection' => autowire('Illuminate\Support\Collection'),

    /**
     * References
     */
    'plugin.namespace' => $config->plugin->namespace,
    'plugin.url' => $config->plugin->url,

    'block.namespace' => $config->block->namespace,

    'path.wp' => WP_CONTENT_DIR,
    'path.wp.plugins' => realpath($config->plugin->filesystem['base'] . '/../'),
    'path.plugin' => $normalizedPath = realpath(rtrim($config->plugin->filesystem['base'], '/')),
    'path.plugin.dist' => realpath(join('/', [$normalizedPath, $config->plugin->filesystem['dist']])),
    'path.plugin.src' => realpath(join('/', [$normalizedPath, $config->plugin->filesystem['src']])),
    'path.plugin.src.blocks' => realpath(join('/', [$normalizedPath, $config->plugin->filesystem['blocks']])),
    'path.plugin.src.plugins' => realpath(join('/', [$normalizedPath, $config->plugin->filesystem['plugins']])),
    'path.plugin.storage' => realpath(join('/', [$normalizedPath, $config->plugin->filesystem['storage']])),
    'path.plugin.storage.cache' => realpath(join('/', [$normalizedPath, $config->plugin->filesystem['cache']])),
    'path.plugin.activate' => realpath(join('/', [$normalizedPath, 'app/Plugin/Activate.php'])),
    'path.plugin.deactivate' => realpath(join('/', [$normalizedPath, 'app/Plugin/Deactivate.php'])),
])
->addDefinitions([
    $projectClasses->registration => autowire($projectClasses->registration),
    'asset.registration' => autowire($projectClasses->registration),

    $projectClasses->activate => autowire($projectClasses->activate),
    'plugin.activate' => create($projectClasses->activate),

    $projectClasses->deactivate => autowire($projectClasses->deactivate),
    'plugin.deactivate' => create($projectClasses->deactivate),

    $projectClasses->main => autowire($projectClasses->main),
    'plugin.main' => create($projectClasses->main),
])
->addDefinitions($config->bindings)->build();
