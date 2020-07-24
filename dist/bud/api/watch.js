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
var watch = function (enabled) {
    this.state.features.watch = enabled;
    return this;
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map