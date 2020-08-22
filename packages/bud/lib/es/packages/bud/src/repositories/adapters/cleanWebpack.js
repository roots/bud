/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
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
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

var cleanWebpack = function (bud) { return ({
    bud: bud,
    name: 'clean-webpack-plugin',
    options: bud.options.get('adapters.clean'),
    make: function () {
        return new CleanWebpackPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('clean');
    },
}); };

export { cleanWebpack };
