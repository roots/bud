"use strict";
exports.__esModule = true;
exports.watch = void 0;
/**
 * ## bud.watch
 *
 * Enable or disable watch mode.
 *
 * ```js
 * bud.watch(true)
 * ```
 */
var watch = function (watchlist, enabled) {
    if (enabled === void 0) { enabled = true; }
    this.state.features.watch = enabled !== null && enabled !== void 0 ? enabled : true;
    this.state.options.devWatch = watchlist;
    return this;
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map