"use strict";
exports.__esModule = true;
exports.plugins = void 0;
var plugins = function (bud) {
    return bud.hooks.filter('webpack.plugins', {
        plugins: bud.plugins
            .entries()
            .map(function (adapter) {
            return bud.hooks.filter("webpack.plugins." + adapter.name, bud.extensions(bud, adapter).build());
        })
            .filter(function (adapter) { return adapter; })
    });
};
exports.plugins = plugins;
//# sourceMappingURL=plugins.js.map