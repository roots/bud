"use strict";
exports.__esModule = true;
exports.hot = void 0;
/**
 * ## bud.hot
 *
 * Enable or disable hot module reloading
 *
 * ```js
 * bud.hot(true) // enable HMR
 * ```
 */
var hot = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.state.features.hot = enabled;
    return this;
};
exports.hot = hot;
//# sourceMappingURL=hot.js.map