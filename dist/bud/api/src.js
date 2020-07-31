"use strict";
exports.__esModule = true;
exports.src = void 0;
var path_1 = require("path");
var src = function (path) {
    return path
        ? path_1.join(this.paths.get('src'), path)
        : this.paths.get('src');
};
exports.src = src;
//# sourceMappingURL=src.js.map