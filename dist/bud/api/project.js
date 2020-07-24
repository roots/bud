"use strict";
exports.__esModule = true;
exports.project = void 0;
var path_1 = require("path");
/**
 * ## bud.project
 *
 * Yield an absolute path from a path relative to the `bud.projectPath`.
 *
 * ```js
 * bud.project('package.json') // absolute path to package.json
 * ```
 */
var project = function (relativePath) {
    return path_1.join(this.state.paths.project, relativePath);
};
exports.project = project;
//# sourceMappingURL=project.js.map