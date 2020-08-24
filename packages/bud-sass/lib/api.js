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
exports.config = void 0;
/**
 * ## bud.scss
 *
 * Enable/disable scss support
 *
 * ```js
 * bud.scss(true)
 * ```
 *
 * ```js
 * bud.scss(false)
 * ```
 */
var config = function (enabled, options) {
    var _a;
    if (options) {
        this.options.set('sass', __assign(__assign({}, ((_a = this.options.get('sass')) !== null && _a !== void 0 ? _a : [])), options));
    }
    return this;
};
exports.config = config;
//# sourceMappingURL=api.js.map