"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.optimization = void 0;
/**
 * Webpack optimization
 */
var optimization = function (bud) {
    return bud.hooks.filter('webpack.optimization', {
        optimization: __assign(__assign({}, (bud.features.enabled('runtimeManifest')
            ? {
                runtimeChunk: bud.hooks.filter('webpack.optimization.runtimeChunk', bud.options.get('webpack.optimization.runtimeChunk.name')
                    ? {
                        name: function (entrypoint) { return "runtime/" + entrypoint.name; }
                    }
                    : false)
            }
            : {})), { splitChunks: bud.hooks.filter('webpack.optimization.splitChunks', bud.features.enabled('splitChunks')
                ? bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups', {
                    cacheGroups: {
                        vendor: {
                            test: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.test', bud.options.get('webpack.optimization.splitChunks.cacheGroups.test')),
                            name: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.name', bud.options.get('webpack.optimization.splitChunks.cacheGroups.name')),
                            chunks: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.chunks', bud.options.get('webpack.optimization.splitChunks.cacheGroups.chunks')),
                            priority: bud.hooks.filter('webpack.optimization.splitChunks.cacheGroups.priority', bud.options.get('webpack.optimization.splitChunks.cacheGroups.priority'))
                        }
                    }
                })
                : false), minimize: bud.hooks.filter('webpack.optimization.minimize', bud.features.enabled('minify')), removeAvailableModules: bud.hooks.filter('webpack.optimization.removeAvailableModules', false), removeEmptyChunks: bud.hooks.filter('webpack.optimization.removeEmptyChunks', false), moduleIds: bud.hooks.filter('webpack.optimization.moduleIds', 'hashed') })
    });
};
exports.optimization = optimization;
//# sourceMappingURL=optimization.js.map