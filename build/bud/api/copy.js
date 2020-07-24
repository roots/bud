"use strict";
exports.__esModule = true;
exports.copy = void 0;
/**
 * ## bud.copy
 *
 * Copy a file.
 *
 * ```js
 * bud.copy(
 *   bud.src('images/image.png'),
 *   bud.dist('image.png'),
 * )
 * ```
 */
var copy = function (from, to) {
    this.state.options.copy.patterns.push({ from: from, to: to });
    return this;
};
exports.copy = copy;
//# sourceMappingURL=copy.js.map