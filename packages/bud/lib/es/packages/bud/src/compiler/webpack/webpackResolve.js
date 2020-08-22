/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
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
import { join } from 'path';

var webpackResolve = function (bud) {
    return bud.hooks.filter('webpack.resolve', {
        resolve: {
            alias: bud.hooks.filter('webpack.resolve.alias', bud.options.get('resolve.alias')),
            extensions: bud.hooks.filter('webpack.resolve.extensions', bud.options.get('resolve.extensions')),
            modules: bud.hooks.filter('webpack.resolve.modules', [
                bud.paths.get('src'),
                join(bud.paths.get('project'), 'node_modules'),
                join(bud.paths.get('framework'), 'node_modules'),
            ]),
        },
    });
};

export { webpackResolve };
