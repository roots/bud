<?php

namespace Roots\Bud\Block\Partial;

use eftec\bladeone\BladeOne as Blade;
use Psr\Container\ContainerInterface;

/**
 * Renderable block
 */
trait BladeRenderable {
    /** @var string */
    protected $view = 'render.blade.php';

    /** @var string */
    protected $viewPath;

    /**
     * Has view.
     *
     * @return bool
     */
    public function hasView(): bool
    {
        $blockDir = explode('/', $this->get('name'))[1];
        $this->view = join('/', [$blockDir, $this->view]);

        $this->viewPath = join('/', [
          $this->bud->get('path.plugin.src.blocks'),
          $this->view,
        ]);

        return realpath($this->viewPath);
    }

    /**
     * Set view.
     *
     * @return void
     */
    public function setView(): void
    {
        $this->bud->set('view', function (ContainerInterface $bud) {
            return new Blade(
                $bud->get('path.plugin.src.blocks'),
                $bud->get('path.plugin.storage.cache')
            );
        });

        $this->set('render_callback', [$this, 'renderView']);
    }

    /**
     * Render view.
     *
     * @param  array
     * @return string
     */
    public function renderView(array $attributes): string
    {
        return $this->bud->get('view')->run($this->view, [
            'attr' => (object) $attributes,
        ]);
    }
}