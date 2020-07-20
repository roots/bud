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
exports.auto = void 0;
/**
 * ## bud.auto
 *
 * Automatically load modules instead of needing to import them.
 *
 * ```js
 * bud.auto({jquery: ['$', 'window.jQuery']})
 * ```
 */
var auto = function (options) {
    var _this = this;
    Object.entries(options).forEach(function (_a) {
        var key = _a[0], modules = _a[1];
        modules.forEach(function (handle) {
            var _a;
            _this.options.auto = __assign(__assign({}, _this.options.auto), (_a = {}, _a[handle] = key, _a));
        });
    });
    return this;
};
exports.auto = auto;
