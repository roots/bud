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
var watch = function (options) {
    var _a, _b;
    this.state.features.watch = (_a = options.enabled) !== null && _a !== void 0 ? _a : true;
    this.state.options.watch = (_b = options.paths) !== null && _b !== void 0 ? _b : [];
    return this;
};
exports.watch = watch;
//# sourceMappingURL=watch.js.map