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
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var paletteWebpackPlugin$1 = require('palette-webpack-plugin');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var paletteWebpackPlugin__default = /*#__PURE__*/_interopDefaultLegacy(paletteWebpackPlugin$1);

const adapter = (bud) => ({
    bud,
    name: 'palette-webpack-plugin',
    make: function () {
        return new paletteWebpackPlugin__default['default']({
            blacklist: this.bud.options.get('palette-blacklist'),
        });
    },
});

const api = function (blacklist) {
    this.options.set('palette-blacklist', blacklist);
    return this;
};

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

exports.paletteWebpackPlugin = paletteWebpackPlugin;
