"use strict";
var _this = this;
exports.__esModule = true;
exports.projectPath = void 0;
/**
 * Set the project base path.
 *
 * @param   {string} dir - absolute path of project
 * @return  {typeof import('./../index')} bud
 */
var projectPath = function (dir) {
    _this.paths.project = dir;
    return _this;
};
exports.projectPath = projectPath;
