"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimization = void 0;
/**
 * Webpack.Optimization
 */
const optimization = function () {
    const output = {
        optimization: this.hooks.filter(`webpack.optimization`, this.store.get('webpack.optimization')),
    };
    if (this.store.enabled(`features.runtimeChunk`)) {
        output.optimization.runtimeChunk = this.hooks.filter(`webpack.optimization.runtimeChunk`, this.store.get(`webpack.optimization.runtimeChunk`));
    }
    if (this.store.enabled('features.vendor')) {
        output.optimization.splitChunks = this.hooks.filter(`webpack.optimization.splitChunks`, this.store.get(`webpack.optimization.splitChunks`));
    }
    return output;
};
exports.optimization = optimization;
//# sourceMappingURL=optimization.js.map