/**
* @roots/bud-dependency-extraction v1.0.0
*
* Adds @wordpress/dependency-extraction-webpack-plugin support
* to the @roots/bud framework <https://github.com/roots/bud>
*
* Consider funding <https://github.com/sponsors/roots>
*
* @copyright Roots <https://roots.io/bud>
* @license MIT
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var DependencyExtractionWebpackPlugin = _interopDefault(require('@wordpress/dependency-extraction-webpack-plugin'));

/**
 * ## bud.dependencyManifest
 *
 * Configure @wordpress/dependency-extraction-webpack-plugin
 *
 * @see https://git.io/JJLxM
 *
 * ```js
 * bud.dependencyManifest({
 *   outputFormat: 'js',
 *   injectPolyfill: false,
 * })
 * ```
 */
const config = function (settings) {
    settings &&
        this.options.set('dependencyManifest', {
            ...this.options.get('dependencyManifest'),
            ...settings,
        });
    return this;
};
const adapter = (bud) => ({
    bud,
    mergeOptions: function () {
        return this.bud.options.get('dependencyManifest');
    },
    make: function () {
        return new DependencyExtractionWebpackPlugin(this.bud.options.get('dependencyExtraction'));
    },
});
const extraction = (bud) => ({
    bud,
    make: function () {
        this.bud.options.set('dependencyExtraction', {});
        this.bud.dependencyExtraction = config;
        this.bud.adapters.add(adapter);
    },
});

exports.extraction = extraction;
