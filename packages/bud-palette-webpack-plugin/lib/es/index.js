/**
 * @roots/palette-webpack-plugin v.2.0.0-next.0 {@link undefined}
 *
 * Adds json palette support for Gutenberg to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import { adapter } from './adapter.js';
import { api } from './api.js';

/**
 * ## bud.paletteWebpackPlugin
 */
const paletteWebpackPlugin = (bud) => ({
    bud,
    name: 'palette-webpack-plugin',
    make: function () {
        this.bud.apply('setPaletteBlacklist', api);
        this.bud.adapters.add(adapter);
    },
});

export { paletteWebpackPlugin };
