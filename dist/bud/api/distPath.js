"use strict";
exports.__esModule = true;
exports.distPath = void 0;
var path_1 = require("path");
var distPath = function (dir) {
    var value = path_1.join(this.paths.get('project'), dir);
    this.logger.info({ name: 'api', "function": 'bud.distPath', value: value }, 'bud.distPath called');
    this.paths.set('dist', value);
    return this;
};
exports.distPath = distPath;
//# sourceMappingURL=distPath.js.map