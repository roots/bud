"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.general = void 0;
const general = function () {
    return this.hooks.filter('webpack', {
        bail: this.hooks.filter('webpack.bail', this.store.get('webpack.bail')),
        context: this.hooks.filter('webpack.context', this.store.get('webpack.context')),
        devtool: this.hooks.filter('webpack.devtool', this.store.get('webpack.devtool')),
        mode: this.hooks.filter('webpack.mode', this.store.get('webpack.mode')),
        name: this.hooks.filter('webpack.name', this.store.get('webpack.name')),
        node: this.hooks.filter('webpack.node', this.store.get('webpack.node')),
        performance: this.hooks.filter('webpack.performance', this.store.get('webpack.performance')),
        recordsPath: this.hooks.filter('webpack.recordsPath', this.store.get('webpack.recordsPath')),
        stats: this.hooks.filter('webpack.stats', this.store.get('webpack.stats')),
        target: this.hooks.filter('webpack.target', this.store.get('webpack.target')),
        watch: this.hooks.filter('webpack.watch', this.store.get('webpack.watch')),
    });
};
exports.general = general;
//# sourceMappingURL=general.js.map