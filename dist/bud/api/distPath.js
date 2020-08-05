"use strict";
exports.__esModule = true;
exports.distPath = void 0;
var path_1 = require("path");
var distPath = function (dir) {
    this.logger.info({ name: 'bud.api', "function": 'bud.distPath', dir: dir }, "bud.distPath called");
    var value = this.hooks.filter('api.distPath.filter', path_1.join(this.paths.get('project'), dir));
    this.paths.set('dist', value);
    return this;
};
exports.distPath = distPath;
//# sourceMappingURL=distPath.js.map