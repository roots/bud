<?php

namespace Roots\Bud\Block\Partial;

/**
 * Renderable block.
 */
trait Renderable {
    /** @var string */
    protected $template = 'render.php';

    /** @var string */
    protected $templatePath;

    /**
     * Has view.
     *
     * @return bool
     */
    public function hasView(): bool
    {
        $blockDir = explode('/', $this->get('name'))[1];
        $this->templatePath = join('/', [$this->bud->get('path.plugin.src.blocks'), $blockDir, $this->view]);

        return realpath($this->templatePath);
    }

    /**
     * Set view.
     *
     * @return void
     */
    public function setView(): void
    {
        $this->set('render_callback', [$this, 'renderView']);
    }

    /**
     * Render view.
     *
     * @param  array
     * @return string
     */
    public function renderView(array $attr): string
    {
        return require $this->templatePath;
    }
}