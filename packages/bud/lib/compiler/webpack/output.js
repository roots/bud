"use strict";
exports.__esModule = true;
exports.output = void 0;
var output = function (bud) {
    return bud.hooks.filter('webpack.output', {
        output: {
            path: bud.hooks.filter('webpack.output.path', bud.paths.get('dist')),
            publicPath: bud.hooks.filter('webpack.output.publicPath', bud.paths.get('public')),
            filename: bud.hooks.filter('webpack.output.filename', bud.features.enabled('hash')
                ? bud.options.get('filenameTemplate').hashed + ".js"
                : bud.options.get('filenameTemplate')["default"] + ".js")
        }
    });
};
exports.output = output;
//# sourceMappingURL=output.js.map