"use strict";
exports.__esModule = true;
exports.project = void 0;
var path_1 = require("path");
var project = function (relativePath) {
    return path_1.join(this.state.paths.project, relativePath);
};
exports.project = project;
//# sourceMappingURL=project.js.map