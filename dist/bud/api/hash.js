"use strict";
exports.__esModule = true;
exports.hash = void 0;
/**
 * ## bud.hash
 *
 * Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.
 *
 * ```js
 * bud.hash(true)
 * ```
 *
 * @param   {boolean} enabled - true to enable filename hashing.
 * @return  {typeof import('../index')} bud
 */
var hash = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.state.features.hash = enabled;
    return this;
};
exports.hash = hash;
//# sourceMappingURL=hash.js.map