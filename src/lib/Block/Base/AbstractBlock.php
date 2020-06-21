<?php

namespace Roots\Bud\Block\Base;

use \WP_Block_Type;
use Psr\Container\ContainerInterface;

/**
 * Abstract block.
 *
 * @package Roots\Bud
 * @author  Kelly Mears <kelly@roots.io>
 */
abstract class AbstractBlock extends WP_Block_Type implements ContainerInterface
{
    /**
     * The block name
     *
     * @var string
     */
    public $name = null;

    /**
     * The public script
     *
     * @var string
     */
    public $script = null;

    /**
     * The public style
     *
     * @var string
     */
    public $style = null;

    /**
     * The editor script
     *
     * @var string
     */
    public $editor_script = null;

    /**
     * The editor style.
     *
     * @var string
     */
    public $editor_style = null;

    /**
     * Get a block property.
     *
     * @param  string id
     * @return mixed
     */
    public function get($id)
    {
        return $this->{$id};
    }

    /**
     * Set a block property
     *
     * @param  string id
     * @param  mixed  value
     * @return void
     */
    public function set($id, $value): void
    {
        $this->{$id} = $value;
    }

    /**
     * Has a block asset
     *
     * @param  string
     * @return bool
     */
     public function has($id): bool
     {
         return property_exists($this, $id);
     }

    /**
     * Register blocktype.
     *
     * @return void
     */
    public function register(): void
    {
        register_block_type($this);
    }
}