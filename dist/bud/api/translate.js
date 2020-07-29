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
exports.translate = void 0;
var translate = function (output) {
    this.features.set('translate', output ? true : false);
    this.features.enabled('translate') && this.options.merge('babel', __assign(__assign({}, this.options.get('babel')), { plugins: __spreadArrays(this.options.get('babel').plugins, [
            [this.require('@wordpress/babel-plugin-makepot'), { output: output }],
        ]) }));
    return this;
};
exports.translate = translate;
//# sourceMappingURL=translate.js.map