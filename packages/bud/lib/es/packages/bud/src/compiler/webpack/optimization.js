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
import { __assign } from 'tslib';

/**
 * Webpack optimization
 */
var optimization = function (bud) {
    return bud.hooks.filter('webpack.optimization', {
        optimization: __assign(__assign({}, (bud.features.enabled('runtimeManifest')
            ? {
                runtimeChunk: bud.hooks.filter('webpack.optimization.runtimeChunk', bud.options.get('webpack.optimization.runtimeChunk.name')
                    ? {
                        name: function (entrypoint) { return "runtime/" + entrypoint.name; },
                    }
                    : false),
            }
            : {})), { splitChunks: bud.hooks.filter('webpack.optimization.splitChunks', bud.features.enabled('splitChunks')
                ? bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups', {
                    cacheGroups: {
                        vendor: {
                            test: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.test', bud.options.get('webpack.optimization.splitChunks.cacheGroups.test')),
                            name: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.name', bud.options.get('webpack.optimization.splitChunks.cacheGroups.name')),
                            chunks: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.chunks', bud.options.get('webpack.optimization.splitChunks.cacheGroups.chunks')),
                            priority: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.priority', bud.options.get('webpack.optimization.splitChunks.cacheGroups.priority')),
                        },
                    },
                })
                : false), minimize: bud.hooks.filter('webpack.optimization.minimize', bud.features.enabled('minify')), removeAvailableModules: bud.hooks.filter('webpack.optimization.removeAvailableModules', false), removeEmptyChunks: bud.hooks.filter('webpack.optimization.removeEmptyChunks', false), moduleIds: bud.hooks.filter('webpack.optimization.moduleIds', 'hashed') }),
    });
};

export { optimization };
