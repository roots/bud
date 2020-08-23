"use strict";
exports.__esModule = true;
exports.webpackResolve = void 0;
var path_1 = require("path");
var webpackResolve = function (bud) {
    return bud.hooks.filter('webpack.resolve', {
        resolve: {
            alias: bud.hooks.filter('webpack.resolve.alias', bud.options.get('webpack.resolve.alias')),
            extensions: bud.hooks.filter('webpack.resolve.extensions', bud.options.get('webpack.resolve.extensions')),
            modules: bud.hooks.filter('webpack.resolve.modules', [
                bud.paths.get('src'),
                path_1.join(bud.paths.get('project'), 'node_modules'),
                path_1.join(bud.paths.get('framework'), 'node_modules'),
            ])
        }
    });
};
exports.webpackResolve = webpackResolve;
//# sourceMappingURL=webpackResolve.js.map