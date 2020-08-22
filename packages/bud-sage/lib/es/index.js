/**
 * @roots/bud-sage v.1.0.0 {@link undefined}
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
import { bud } from '@roots/bud';
import { extraction } from '@roots/bud-dependency-extraction-webpack-plugin';
import { sass } from '@roots/bud-sass';
import { eslint } from '@roots/bud-eslint';
import { stylelint } from '@roots/bud-stylelint';
import { purgecss, presets } from '@roots/bud-purgecss';

const features = {
    purgecss: purgecss,
    eslint: eslint,
    stylelint: stylelint,
    extraction: extraction,
    sass: sass,
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
    enabled.includes(purgecss) &&
        this.purgecss({
            enabled: this.inProduction,
            options: {
                ...presets.wordpress,
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
    bud.apply('withFeatures', withFeatures);
    bud
        .srcPath('resources/assets')
        .distPath('dist')
        .alias({
        '@fonts': bud.src('fonts'),
        '@images': bud.src('images'),
        '@scripts': bud.src('scripts'),
        '@styles': bud.src('styles'),
    })
        .auto({
        jquery: ['$', 'window.jQuery'],
    })
        .runtimeManifest()
        .mini(bud.inProduction)
        .map(bud.inDevelopment)
        .hash(bud.inProduction)
        .vendor();
    return bud;
})();

export { sage };
