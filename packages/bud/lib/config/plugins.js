"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.plugins = void 0;
var plugins = function (bud) {
    return bud.hooks.filter('webpack.plugins', {
        plugins: Object.entries(bud.plugins.entries())
            .reduce(function (a, _a) {
            var fn = _a[1];
            return __spreadArrays((a ? a : []), [
                typeof fn == 'function'
                    ? bud.controller.use(fn).build()
                    : null,
            ]);
        }, [])
            .filter(function (plugin) { return plugin; })
    });
};
exports.plugins = plugins;
//# sourceMappingURL=plugins.js.map