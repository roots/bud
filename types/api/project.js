"use strict";
exports.__esModule = true;
exports.project = void 0;
var path_1 = require("path");
/**
 * ## bud.project
 *
 * Yield an absolute path from a path relative to the `bud.projectPath`.
 *
 * ### Example
 *
 * ```js
 * bud.project('package.json') // absolute path to package.json
 * ```
 *
 * @param   {string} relativePath - relative path
 * @return  {string} absolutePath
 */
var project = function (relativePath) {
    return path_1.join(this.paths.project, relativePath);
};
exports.project = project;
