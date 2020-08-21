/**
 * @roots/bud-purgecss v1.0.0
 * Adds purgecss support to Bud
 *
 * Consider funding our tools <https://github.com/sponsors/roots>
 *
 * @copyright Roots <https://roots.io/bud>
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var purgecss$1 = _interopDefault(require('@fullhuman/postcss-purgecss'));
var wordpress = _interopDefault(require('purgecss-with-wordpress'));

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
        purgecss$1(options.options),
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
    make: function () {
        this.bud.purgecss = config;
    },
});
const presets = { wordpress };

exports.presets = presets;
exports.purgecss = purgecss;
