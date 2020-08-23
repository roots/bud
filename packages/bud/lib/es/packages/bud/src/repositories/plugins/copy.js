/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import CopyWebpackPlugin from 'copy-webpack-plugin';

var copy = function (bud) { return ({
    bud: bud,
    name: 'copy-webpack-plugin',
    options: bud.options.get('webpack.plugins.copy'),
    make: function () {
        return new CopyWebpackPlugin(this.options);
    },
    when: function () {
        return this.options.patterns.length > 0;
    },
}); };

export { copy };
