<?php

namespace Roots\Bud\Asset\Base;

use Roots\Bud\Collection\Collection;
use Roots\Bud\Services\ServiceProvider;

/**
 * Abstract asset.
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
abstract class AbstractAsset extends Collection
{
    public $id;

    public $value;

    /**
     * Construct.
     *
     * @param  Roots\Bud\Container\Container $bud
     * @param  string                        $id
     * @param  string                        $value
     */
    public function __construct($bud, $id, $value)
    {
        $this->bud = $bud;

        $this->id = $id;

        $this->value = $value;

        $this->url = $this->bud['url'];
    }

    /**
     * Asset dependencies.
     *
     * @return array
     */
    public function dependencies(): array
    {
        return json_decode(file_get_contents($this->path()))->dependencies ?? [];
    }

    /**
     * Asset url.
     *
     * @return string
     */
    public function url()
    {
        return join('/', [$this->url, $this->value]);
    }

    /**
     * Asset path.
     *
     * @return string
     */
    public function path()
    {
        return join('/', [$this->bud['directories']->base, $this->value]);
    }
}
