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
/**
 * Process @wordpress/i18n strings from JS source assets.
 *
 * If you are already translating strings with `yarn translate` then
 * there is no reason to run this separately.
 *
 * @example bud.translate('resources/languages/sage.pot')
 * @param   {string} output - output makepot
 * @return  {typeof import('./../index')} bud
 */
var translate = function (output) {
    var _this = this;
    this.features.translate = output ? true : false;
    this.features.translate &&
        (function () {
            _this.options.babel = __assign(__assign({}, _this.options.babel), { plugins: __spreadArrays(_this.options.babel.plugins, [
                    [
                        require('@wordpress/babel-plugin-makepot'),
                        { output: output },
                    ],
                ]) });
        })();
    return this;
};
exports.translate = translate;
