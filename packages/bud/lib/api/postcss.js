"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.postcss = void 0;
var postcss = function (_a) {
    var enabled = _a.enabled, plugins = _a.plugins;
    this.features.set('postcss', enabled !== null && enabled !== void 0 ? enabled : true);
    plugins &&
        this.options.set('postcss.plugins', __spreadArrays(this.options.get('postcss.plugins'), plugins));
    return this;
};
exports.postcss = postcss;
//# sourceMappingURL=postcss.js.map