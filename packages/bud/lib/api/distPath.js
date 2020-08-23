"use strict";
exports.__esModule = true;
exports.distPath = void 0;
var path_1 = require("path");
var distPath = function (dir) {
    this.paths.set('dist', this.hooks.filter('api.distPath', path_1.join(this.paths.get('project'), dir)));
    return this;
};
exports.distPath = distPath;
//# sourceMappingURL=distPath.js.map