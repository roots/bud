"use strict";
exports.__esModule = true;
exports.project = void 0;
var path_1 = require("path");
var project = function (path) {
    return path ? path_1.join(this.paths.get('project'), path) : this.paths.get('project');
};
exports.project = project;
//# sourceMappingURL=project.js.map