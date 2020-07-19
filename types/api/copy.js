"use strict";
var _this = this;
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
 *
 * @param     {string} src - path to copy from
 * @param     {string} dist - path to copy to
 * @return    {typeof import('./../index')} bud
 */
var copy = function (from, to) {
    _this.options.copy.patterns.push({ from: from, to: to });
    return _this;
};
exports.copy = copy;
