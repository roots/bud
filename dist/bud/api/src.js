"use strict";
exports.__esModule = true;
exports.src = void 0;
var path_1 = require("path");
var src = function (path) {
    return path
        ? path_1.join(this.state.paths.src, path)
        : this.state.paths.src;
};
exports.src = src;
//# sourceMappingURL=src.js.map