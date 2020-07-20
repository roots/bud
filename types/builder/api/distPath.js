"use strict";
exports.__esModule = true;
exports.distPath = void 0;
var path_1 = require("path");
/**
 * Set the project's dist directory.
 * @example bud.distPath('dist') // default unless specified
 * @param   {string} dir - path of dist directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
var distPath = function (dir) {
    this.paths.dist = path_1.join(this.paths.project, dir);
    return this;
};
exports.distPath = distPath;
