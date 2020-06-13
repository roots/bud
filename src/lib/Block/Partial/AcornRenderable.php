<?php

namespace Roots\Bud\Block\Partial;

use Psr\Container\ContainerInterface;
use function Roots\view;

/**
 * Acorn rendered block.
 */
trait AcornRenderable {
    /** @var string */
    protected $view = 'render';

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

        $this->viewPath = join('/', [
            $this->bud->get('path.plugin.src.blocks'),
            $blockDir,
            "{$this->view}.blade.php",
        ]);

        $this->view = join('.', [$blockDir, $this->view]);

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
            view()->addLocation(
                $bud->get('path.plugin.src.blocks')
            );

            return view();
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
        return $this->bud->get('view')->make(
            $this->view,
            ['attr' => (object) $attributes]
        );
    }
}
