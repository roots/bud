"use strict";
exports.__esModule = true;
exports.src = void 0;
var path_1 = require("path");
/**
 * ## bud.src
 *
 * Return an absolute path from a given path relative to the directory assigned by `bud.srcPath`.
 *
 * ### Example
 *
 * ```js
 * bud.src('scripts/app.js') // absolute path to the source file
 * ```
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
var src = function (relativePath) {
    return path_1.join(this.paths.src, relativePath);
};
exports.src = src;
