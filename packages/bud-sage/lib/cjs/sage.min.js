/**
 * @roots/bud-sage v.2.0.0-next.0 {@link undefined}
 *
 * Preset configuration for Sage projects
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

var bud = require('@roots/bud');
var budDependencyExtractionWebpackPlugin = require('@roots/bud-dependency-extraction-webpack-plugin');
var budSass = require('@roots/bud-sass');
var budEslint = require('@roots/bud-eslint');
var budStylelint = require('@roots/bud-stylelint');
var budPurgecss = require('@roots/bud-purgecss');

const features = {
    purgecss: budPurgecss.purgecss,
    eslint: budEslint.eslint,
    stylelint: budStylelint.stylelint,
    extraction: budDependencyExtractionWebpackPlugin.extraction,
    sass: budSass.sass,
};
const withFeatures = function (options) {
    const enabled = [];
    options
        ? Object.entries(features).forEach(([feature, extension]) => {
            const isEnabled = !options ||
                !options.hasOwnProperty(feature) ||
                options[feature] !== false;
            isEnabled && enabled.push(extension);
        })
        : Object.values(features).forEach(feature => {
            enabled.push(feature);
        });
    this.use(enabled);
    enabled.includes(budPurgecss.purgecss) &&
        this.purgecss({
            enabled: this.inProduction,
            options: {
                ...budPurgecss.presets.wordpress,
            },
        });
    return this;
};
/**
 * @roots/bud-sage
 *
 * Preset configuration for Sage projects
 */
const sage = (() => {
    bud.bud.apply('withFeatures', withFeatures);
    bud.bud
        .srcPath('resources/assets')
        .distPath('dist')
        .alias({
        '@fonts': bud.bud.src('fonts'),
        '@images': bud.bud.src('images'),
        '@scripts': bud.bud.src('scripts'),
        '@styles': bud.bud.src('styles'),
    })
        .auto({
        jquery: ['$', 'window.jQuery'],
    })
        .runtimeManifest()
        .mini(bud.bud.inProduction)
        .map(bud.bud.inDevelopment)
        .hash(bud.bud.inProduction)
        .vendor();
    return bud.bud;
})();

exports.sage = sage;
