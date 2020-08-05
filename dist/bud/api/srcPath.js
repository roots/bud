"use strict";
exports.__esModule = true;
exports.srcPath = void 0;
var path_1 = require("path");
var srcPath = function (dir) {
    this.logger.info({ name: 'bud.api', "function": 'bud.srcPath', dir: dir }, "bud.srcPath called");
    var setPath = path_1.join(this.paths.get('project'), dir);
    /**
     * If set, CLI arguments take precendence over config.
     */
    !this.args.get('src') && this.paths.set('src', setPath);
    return this;
};
exports.srcPath = srcPath;
//# sourceMappingURL=srcPath.js.map