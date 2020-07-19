"use strict";
exports.__esModule = true;
exports.dist = void 0;
var path_1 = require("path");
/**
 * Yield an absolute path from a path relative to the dist dir.
 * @example bud.dist('scripts/app.js') // returns the absolute path to the compiled app.js
 * @param   {string} relativePath - relative path
 * @return  {string} absolute path
 */
var dist = function (relativePath) {
    return path_1.join(this.paths.dist, relativePath);
};
exports.dist = dist;
