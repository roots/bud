<?php

namespace Roots\Bud\Manifest\Base;

use Roots\Bud\Collection\Collection;
use Roots\Bud\Services\ServiceProvider;

/**
 * Abstract Manifest.
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
abstract class AbstractManifest extends ServiceProvider
{
    /**
     * Register the plugin service.
     *
     * @return void
     */
    public function register(): void
    {
        $this->entries = $this->collectFromJson($this->bud['files']->manifest)
            ->mapWithKeys(function ($dist, $src) {
                return (object) [$src => $this->bud['url'] . $dist];
            });
    }

    /**
     * Get a specific manifest entry.
     *
     * @param  string $id
     * @return mixed
     */
    public function get(string $id)
    {
        return $this->entries[$id];
    }

    /**
     * Collect from JSON.
     *
     * @param  string path
     * @return CollectionInterface
     */
    protected function collectFromJson(string $path)
    {
        return Collection::make(json_decode(file_get_contents($path)));
    }
}