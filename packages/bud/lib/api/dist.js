"use strict";
exports.__esModule = true;
exports.dist = void 0;
var path_1 = require("path");
var dist = function (path) {
    return path
        ? path_1.join(this.paths.get('dist'), path)
        : this.paths.get('dist');
};
exports.dist = dist;
//# sourceMappingURL=dist.js.map