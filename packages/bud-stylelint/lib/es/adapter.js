/**
 * @roots/bud-stylelint v.1.0.0 {@link undefined}
 *
 * Adds stylelint support to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import StylelintPlugin from 'stylelint-webpack-plugin';

/**
 * Adapter: Stylelint Webpack Plugin
 */
const adapter = () => ({
    setOptions: function () {
        return {
            configFile: this.bud.configs.get('stylelint'),
        };
    },
    make: function () {
        return new StylelintPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('stylelint');
    },
});

export default adapter;
