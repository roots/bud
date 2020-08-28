"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.rules = void 0;
var rules = function (bud) {
    return bud.hooks.filter('webpack.module', {
        module: bud.hooks.filter('webpack.module.rules', {
            rules: Object.entries(bud.rules.repository).reduce(function (a, _a) {
                var key = _a[0], fn = _a[1];
                return __spreadArrays((a ? a : []), [
                    bud.hooks.filter("webpack.module.rules." + key, typeof fn == 'function' ? fn(bud) : console.log(fn)),
                ]);
            }, [])
        })
    });
};
exports.rules = rules;
//# sourceMappingURL=rules.js.map