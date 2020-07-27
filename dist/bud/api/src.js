"use strict";
exports.__esModule = true;
exports.src = void 0;
var path_1 = require("path");
/**
 * ## bud.src
 *
 * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
 *
 * ```js
 * bud.src('scripts/app.js') // absolute path to the source file
 * ```
 */
var src = function (relativePath) {
    if (relativePath === void 0) { relativePath = ''; }
    return path_1.join(this.state.paths.src, relativePath);
};
exports.src = src;
//# sourceMappingURL=src.js.map