"use strict";
exports.__esModule = true;
exports.dist = void 0;
var path_1 = require("path");
/**
 * ## bud.dist
 *
 * Yield an absolute path from a path relative to the dist dir.
 *
 * ```js
 * bud.dist('scripts/app.js')
 * ```
 */
var dist = function (relativePath) {
    return path_1.join(this.state.paths.dist, relativePath);
};
exports.dist = dist;
//# sourceMappingURL=dist.js.map