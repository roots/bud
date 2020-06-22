<?php

namespace Roots\Bud\Manifest\Base;

use Roots\Bud\Collection\Collection;
use Roots\Bud\Asset\Asset;
use Roots\Bud\Services\ServiceProvider;

/**
 * Abstract Manifest.
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
abstract class AbstractManifest extends ServiceProvider
{
    public $entries;

    /**
     * Register the plugin service.
     *
     * @return void
     */
    public function register(): void
    {
        $this->entries = Collection::make([]);

        $this->collectFromJson($this->bud['files']->manifest)
            ->each(function ($value, $id) {
                $this->set($id, $value);
            });
    }

    /**
     * Set a specific manifest entry.
     *
     * @param  string $id
     * @param  string $value
     *
     * @return void
     */
    public function set(string $id, string $value): void
    {
        $asset = new $this->bud['asset']($this->bud, $id, $value);

        $this->entries->put($id, $asset);
    }

    /**
     * Get a specific manifest entry.
     *
     * @param  string $id
     * @return Asset
     */
    public function asset(string $filename): Asset
    {
        return $this->entries[$filename];
    }

    /**
     * Collect from JSON.
     *
     * @param  string path
     * @return CollectionInterface
     */
    protected function collectFromJson(string $path)
    {
        return Collection::make(json_decode(file_get_contents($path), true));
    }
}