<?php

namespace Roots\Bud\Block\Base;

use \WP_Block_Type;
use Illuminate\Support\Collection;
use Psr\Container\ContainerInterface;
use Roots\Bud\Block\Contract\BlockInterface;
use Roots\Bud\Block\Contract\RenderableInterface;
use Roots\Bud\Block\Partial\BladeRenderable;

/**
 * Block class.
 */
abstract class AbstractBlock extends WP_Block_Type implements
    BlockInterface,
    ContainerInterface,
    RenderableInterface
{
    use BladeRenderable;

    /** @var string */
    public $name = null;

    /** @var string */
    public $script = null;

    /** @var string */
    public $style = null;

    /** @var string */
    public $editor_script = null;

    /** @var string */
    public $editor_style = null;

    /** @var \WP_Block_Type\render_callback */
    public $render_callback;

    /**
     * Constructor.
     *
     * @param Collection
     * @param ContainerInterface
     */
    public function __construct(
        ContainerInterface $bud,
        string $name
    ) {
        $this->bud = $bud;
        $this->name = $name;

        $this->hasView() && $this->setView();
    }

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