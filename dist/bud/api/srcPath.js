"use strict";
exports.__esModule = true;
exports.srcPath = void 0;
var path_1 = require("path");
var srcPath = function (dir) {
    this.state.paths.src = path_1.join(this.state.paths.project, dir);
    return this;
};
exports.srcPath = srcPath;
//# sourceMappingURL=srcPath.js.map