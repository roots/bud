"use strict";
exports.__esModule = true;
exports.publicPath = void 0;
/**
 * ## bud.publicPath
 *
 * Set the project public path.
 *
 * ### Example
 *
 * ```js
 * bud.publicPath('dist')
 * ```
 */
var publicPath = function (dir) {
    this.state.paths.public = dir;
    return this;
};
exports.publicPath = publicPath;
//# sourceMappingURL=publicPath.js.map