<?php

namespace Roots\Bud\Asset\Base;

use Roots\Bud\Collection\Collection;
use Roots\Bud\Container\Container;

/**
 * Abstract asset.
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
abstract class AbstractAsset extends Collection
{
    /**
     * @var string
     */
    public $id;

    /**
     * @var string
     */
    public $value;

    /**
     * Construct.
     * @param  Roots\Bud\Container\Container $bud
     * @param  string                        $id
     * @param  string                        $value
     */
    public function __construct(Container $bud, string $id, string $value)
    {
        $this->bud = $bud;
        $this->id = $id;
        $this->value = $value;
    }

    /**
     * Asset dependencies.
     * @return array
     */
    public function dependencies(): array
    {
        return json_decode(file_get_contents($this->path()))->dependencies ?? [];
    }

    /**
     * Asset url.
     * @return string
     */
    public function url(): string
    {
        return join('/', [$this->bud['url'], $this->bud['directories']->dist . $this->value]);
    }

    /**
     * Asset contents.
     * @return string
     */
    public function contents(): string
    {
        return file_get_contents($this->path());
    }

    /**
     * Asset JSON.
     * @return object
     */
    public function json(): object
    {
        return json_decode($this->contents());
    }

    /**
     * Asset path.
     * @return string
     */
    public function path(): string
    {
        return join('/', [$this->bud['directories']->base, $this->bud['directories']->dist . $this->value]);
    }
}
