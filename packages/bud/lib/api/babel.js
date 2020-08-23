"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.babel = void 0;
var babel = function (options) {
    var _a, _b;
    this.features.enable('babel');
    this.options.set('babel', this.hooks.filter('api.babel', __assign(__assign({}, this.options.get('babel')), { plugins: this.hooks.filter('api.babel.plugins', __spreadArrays(this.options.get('babel.plugins'), ((_a = options.plugins) !== null && _a !== void 0 ? _a : []))), presets: this.hooks.filter('api.babel.presets', __spreadArrays(this.options.get('babel.presets'), ((_b = options.presets) !== null && _b !== void 0 ? _b : []))) })));
    return this;
};
exports.babel = babel;
//# sourceMappingURL=babel.js.map