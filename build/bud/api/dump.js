"use strict";
exports.__esModule = true;
exports.dump = void 0;
/**
 * Dump generated webpack config for debugging
 *
 * ```js
 * bud.dump(true)
 * ```
 */
var dump = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.state.features.dump = enabled;
    return this;
};
exports.dump = dump;
//# sourceMappingURL=dump.js.map