"use strict";
exports.__esModule = true;
exports.distPath = void 0;
var path_1 = require("path");
var distPath = function (dir) {
    this.state.paths.dist = path_1.join(this.state.paths.project, dir);
    return this;
};
exports.distPath = distPath;
//# sourceMappingURL=distPath.js.map