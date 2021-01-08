"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitChunks = exports.runtimeChunk = exports.noEmitOnErrors = exports.namedModules = void 0;
exports.namedModules = true;
exports.noEmitOnErrors = true;
exports.runtimeChunk = {
    name: entrypoint => `runtime/${entrypoint.name}`,
};
exports.splitChunks = {
    chunks: 'async',
    minSize: 20000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    cacheGroups: {
        vendor: {
            enforce: true,
            priority: -10,
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name(module, _chunks, cacheGroupKey) {
                const moduleFileNameParts = module
                    .identifier()
                    .split('/')
                    .reduceRight(item => item)
                    .split('.');
                const file = moduleFileNameParts
                    .slice(0, moduleFileNameParts.length - 1)
                    .join('.');
                return `${cacheGroupKey}/${file}`;
            },
            reuseExistingChunk: true,
        },
    },
};
//# sourceMappingURL=optimization.js.map