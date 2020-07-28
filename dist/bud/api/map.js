"use strict";
exports.__esModule = true;
exports.map = void 0;
/**
 * ## bud.map
 *
 * Enable or disable source-maps
 *
 * ### Example
 *
 * ```js
 * bud.map(true)
 * ```
 */
var map = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.state.features.sourceMap = enabled !== null && enabled !== void 0 ? enabled : true;
    return this;
};
exports.map = map;
//# sourceMappingURL=map.js.map