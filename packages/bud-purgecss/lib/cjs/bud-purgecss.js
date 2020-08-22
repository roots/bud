/**
 * @roots/bud-purgecss v.1.0.0 {@link https://roots.io/bud}
 *
 * Adds purgecss support to Bud
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

var purgecss$1 = require('@fullhuman/postcss-purgecss');
var wordpress = require('purgecss-with-wordpress');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var purgecss__default = /*#__PURE__*/_interopDefaultLegacy(purgecss$1);
var wordpress__default = /*#__PURE__*/_interopDefaultLegacy(wordpress);

/**
 * ## bud.purge
 *
 * Purge unused CSS from compiled stylesheets
 *
 * @see https://purgecss.com/guides/wordpress.html
 * @see https://purgecss.com/configuration.html
 *
 * ```js
 * bud.purge({
 *   enabled: bud.inProduction,
 *   content: [bud.project('resources/views/**')],
 *   allow: require('purgecss-with-wordpress').whitelist,
 *   allowPatterns: require('purgecss-with-wordpress').whitelistPatterns,
 * })
 * ```
 */
const config = function (options) {
    this.options.set('postcss.plugins', [
        ...this.options.get('postcss.plugins'),
        purgecss__default['default'](options.options),
    ]);
    return this;
};

/**
 * Bud extension: purgecss
 *
 * Adds purgecss support to the Bud framework.
 *
 * @type {Extension}
 */
const purgecss = (bud) => ({
    bud,
    name: 'purgecss',
    make: function () {
        this.bud.apply('purgecss', config);
    },
});
const presets = { wordpress: wordpress__default['default'] };

exports.presets = presets;
exports.purgecss = purgecss;
