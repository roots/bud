"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = void 0;
const output = function () {
    const path = this.hooks.filter('webpack.output.path', this.store.get('webpack.output.path'));
    const publicPath = this.hooks.filter('webpack.output.publicPath', this.store.get('webpack.output.publicPath'));
    const filename = this.hooks.filter('webpack.output.filename', this.store.enabled('features.hash')
        ? `[name].[hash].js`
        : `[name].js`);
    return {
        output: {
            path,
            publicPath,
            filename,
        },
    };
};
exports.output = output;
//# sourceMappingURL=output.js.map