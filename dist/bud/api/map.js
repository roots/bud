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
    this.state.features.map = enabled;
    return this;
};
exports.map = map;
//# sourceMappingURL=map.js.map