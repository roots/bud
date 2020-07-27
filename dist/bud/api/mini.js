"use strict";
exports.__esModule = true;
exports.mini = void 0;
/**
 * ## bud.hot
 *
 * Enable or disable minification
 *
 * ```js
 * bud.hot(true) // enable
 * ```
 *
 * ```js
 * bud.hot(false) // disable
 * ```
 */
var mini = function (enable) {
    if (enable === void 0) { enable = true; }
    this.state.features.minify = enable;
    return this;
};
exports.mini = mini;
//# sourceMappingURL=mini.js.map