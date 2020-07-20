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
/**
 * Configure Babel.
 *
 * If you prefer, you may utilize a babel.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * @see https://babeljs.io/docs/en/configuration
 *
 * @param   {{enabled: boolean, presets: any[], plugins: any[]}} options
 * @param   {any[]}    options.plugins
 * @param   {any[]}    options.presets
 * @return  {typeof import('./../index')} bud
 */
var babel = function (options) {
    this.features.babel = true;
    this.options.babel = __assign(__assign({}, (this.options.babel ? this.options.babel : {})), { presets: __spreadArrays((this.options.babel.presets
            ? this.options.babel.presets
            : {}), (options.presets ? options.presets : {})), plugins: __spreadArrays((this.options.babel.plugins
            ? this.options.babel.plugins
            : {}), (options.plugins ? options.plugins : {})) });
    return this;
};
exports.babel = babel;
