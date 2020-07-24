"use strict";
exports.__esModule = true;
exports.srcPath = void 0;
var path_1 = require("path");
/**
 * ## bud.srcPath
 *
 * Set the project's src directory.
 *
 *  ```js
 * bud.srcPath('src') // default unless specified
 * ```
 */
var srcPath = function (src) {
    this.state.paths.src = path_1.join(this.state.paths.project, src);
    return this;
};
exports.srcPath = srcPath;
//# sourceMappingURL=srcPath.js.map