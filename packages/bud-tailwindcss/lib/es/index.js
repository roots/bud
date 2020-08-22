/**
 * @roots/bud-tailwindcss v.1.0.0 {@link undefined}
 *
 * Adds tailwindcss support to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import tailwind from 'tailwindcss';
import configTailwind from './api.js';

const tailwindcss = (bud) => ({
    bud,
    name: 'tailwindcss',
    make: function () {
        this.bud.apply('tailwind', configTailwind);
        this.bud.options.set('postcss.plugins', [
            ...this.bud.options.get('postcss.plugins'),
            tailwind({
                config: this.bud.project('tailwind.config.js'),
            }),
        ]);
        this.bud.options.set('scss.sassOptions', {
            processCssUrls: false,
            ...this.bud.options.get('scss.sassOptions'),
        });
    },
});

export { tailwindcss };
