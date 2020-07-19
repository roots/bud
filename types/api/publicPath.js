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
 *
 * @param   {string} dir - public path of project
 * @return  {typeof import('./../index')} bud
 */
var publicPath = function (dir) {
    this.paths.public = dir;
    return this;
};
exports.publicPath = publicPath;
