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
exports.features = void 0;
/**
 * ## bud.features
 *
 * Enable or disable Bud's CLI build output.
 *
 * ```js
 * bud.dashboard(false) // disable dashboard
 * ```
 */
var features = function (features) {
    this.state.features = __assign(__assign({}, this.state.features), features);
    return this;
};
exports.features = features;
//# sourceMappingURL=features.js.map