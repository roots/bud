"use strict";
exports.__esModule = true;
exports.useScss = void 0;
var implementing = function () {
    try {
        if (require.resolve('sass')) {
            return {
                name: 'dart-sass',
                implementation: require('sass')
            };
        }
    }
    catch (_a) {
        return {
            name: 'node-sass',
            implementation: require('node-sass')
        };
    }
};
var useScss = function (rule, bud) {
    var loader = bud.loaders.get('scss');
    var _a = implementing(), name = _a.name, implementation = _a.implementation;
    var options = {
        sourceMap: bud.features.enabled('sourceMap'),
        implementation: implementation
    };
    bud.logger.info({ name: rule }, "sass-loader: using " + name + " implementation");
    bud.logger.info({ name: rule, loader: loader, options: options }, "using sass-loader");
    return { loader: loader, options: options };
};
exports.useScss = useScss;
//# sourceMappingURL=useScss.js.map