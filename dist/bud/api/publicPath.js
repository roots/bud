"use strict";
exports.__esModule = true;
exports.publicPath = void 0;
var publicPath = function (dir) {
    this.logger.info({ name: 'bud.api', "function": 'bud.publicPath', dir: dir }, "bud.publicPath called");
    this.paths.set('public', dir);
    return this;
};
exports.publicPath = publicPath;
//# sourceMappingURL=publicPath.js.map