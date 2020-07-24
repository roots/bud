"use strict";
exports.__esModule = true;
exports.debug = void 0;
/**
 * ## bud.debug
 *
 * Enable or disable debug mode.
 *
 * ```js
 * bud.debug(true) // debug enabled
 * ```
 *
 * ```js
 * bud.debug(false) // debug disabled
 * ```
 */
var debug = function (enabled) {
    this.state.features.debug = enabled;
    return this;
};
exports.debug = debug;
//# sourceMappingURL=debug.js.map