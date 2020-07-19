"use strict";
exports.__esModule = true;
exports.srcPath = void 0;
var path_1 = require("path");
/**
 * Set the project's src directory.
 * @example bud.srcPath('src') // default unless specified
 * @param   {string} dir - path of src directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
var srcPath = function (src) {
    this.paths.src = path_1.join(this.paths.project, src);
    return this;
};
exports.srcPath = srcPath;
