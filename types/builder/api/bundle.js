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
exports.__esModule = true;
exports.bundle = void 0;
/**
 * ## bud.bundle
 *
 * Compile a group of assets.
 *
 * ```js
 * bud.bundle('app', [
 *   bud.src('app.js'),
 *   bud.src('app.css'),
 * ])
 * ```
 *
 * @param   {string} name - output name.
 * @param   {array}  entries - array of src assets to include in the bundle.
 * @return  {typeof import('./../index')} bud
 */
var bundle = function (name, entries) {
    var _a;
    this.options.entry = __assign(__assign({}, this.options.entry), (_a = {}, _a["" + name] = entries, _a));
    return this;
};
exports.bundle = bundle;
