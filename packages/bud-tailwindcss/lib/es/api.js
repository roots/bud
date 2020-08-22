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

/**
 * ## bud.tailwind
 *
 * Configure tailwindcss support
 *
 * ```js
 * bud.tailwind({config: bud.project('custom-tailwind.js')})
 * ```
 *
 * ```js
 * bud.tailwind(({theme}) => ({
 *  colors: {},
 *  // ...
 * }))
 * ```
 */
const configTailwind = function (config) {
    this.options.set('postCss', {
        ...this.options.postCss,
        plugins: [
            ...this.options.get('postCss').plugins,
            tailwind(config),
        ],
    });
    return this;
};

export default configTailwind;
