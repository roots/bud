"use strict";
exports.__esModule = true;
exports.dist = void 0;
var path_1 = require("path");
var dist = function (path) {
    this.logger.info({ name: 'bud.api', "function": 'bud.dist', path: path }, "bud.dist called");
    return path ? path_1.join(this.paths.get('dist'), path) : this.paths.get('dist');
};
exports.dist = dist;
//# sourceMappingURL=dist.js.map