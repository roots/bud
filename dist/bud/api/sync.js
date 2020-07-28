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
exports.sync = void 0;
/**
 * ## bud.sync
 *
 * Configure BrowserSync.
 *
 * ```js
 * bud.sync({
 *   enabled: !bud.inProduction,
 *   proxy: 'http://bud.test',
 *   host: 'localhost',
 *   port: 3000,
 * })
 * ```
 */
var sync = function (_a) {
    var _b = _a.enabled, enabled = _b === void 0 ? true : _b, options = _a.options;
    this.state.features.browserSync = enabled;
    this.state.options.browserSync = __assign(__assign({}, this.state.options.browserSync), options);
    return this;
};
exports.sync = sync;
//# sourceMappingURL=sync.js.map