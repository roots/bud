"use strict";
exports.__esModule = true;
exports.distPath = void 0;
var path_1 = require("path");
/**
 * Set the project's dist directory.
 *
 * ```js
 * bud.distPath('dist')
 * ```
 */
var distPath = function (relativePath) {
    this.state.paths.dist = path_1.join(this.state.paths.project, relativePath);
    return this;
};
exports.distPath = distPath;
//# sourceMappingURL=distPath.js.map