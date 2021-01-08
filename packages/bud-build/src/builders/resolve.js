"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = void 0;
const resolve = function () {
    return {
        resolve: {
            alias: this.hooks.filter('webpack.resolve.alias', this.store.get('webpack.resolve.alias')),
            extensions: this.hooks.filter('webpack.resolve.extensions', this.store.get('webpack.resolve.extensions')),
            modules: this.hooks.filter('webpack.resolve.modules', [this.store.get('webpack.context'), 'node_modules']),
        },
    };
};
exports.resolve = resolve;
//# sourceMappingURL=resolve.js.map