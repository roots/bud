"use strict";
exports.__esModule = true;
exports.projectPath = void 0;
/**
 * ## bud.projectPath
 *
 * Set the project base path.
 *
 * ```js
 * bud.projectPath(__dirname)
 * ```
 */
var projectPath = function (dir) {
    this.state.paths.project = dir;
    return this;
};
exports.projectPath = projectPath;
//# sourceMappingURL=projectPath.js.map