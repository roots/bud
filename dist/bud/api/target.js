"use strict";
exports.__esModule = true;
exports.target = void 0;
/**
 * bud.target
 *
 * Set the build target.
 *
 * ```js
 * bud.target('web') // default
 * ```
 */
var target = function (target) {
    this.state.options.target = target;
    return this;
};
exports.target = target;
//# sourceMappingURL=target.js.map