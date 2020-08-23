"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.usedExt = void 0;
var usedExt = function (entries, bud) {
    entries.forEach(function (entry) {
        var ext = "." + entry.split('.')[entry.split('.').length - 1];
        !bud.options.get('webpack.resolve.extensions').includes(ext) &&
            bud.options.set('webpack.resolve.extensions', __spreadArrays(bud.options.get('webpack.resolve.extensions'), [
                ext,
            ]));
    });
};
exports.usedExt = usedExt;
//# sourceMappingURL=usedExt.js.map