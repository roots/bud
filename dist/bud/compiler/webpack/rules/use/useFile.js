"use strict";
exports.__esModule = true;
exports.useFile = void 0;
var useFile = function (rule, bud) {
    var loader = bud.hooks.filter('webpack.rules.fileloader.loader', bud.loaders.get('file'));
    var options = bud.hooks.filter('webpack.rules.fileloader.options', {
        name: '[path][name].[ext]'
    });
    bud.logger.info({ name: rule, loader: loader }, "using file-loader");
    return {
        loader: loader,
        options: options
    };
};
exports.useFile = useFile;
//# sourceMappingURL=useFile.js.map