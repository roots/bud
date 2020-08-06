"use strict";
exports.__esModule = true;
exports.projectPath = void 0;
var projectPath = function (dir) {
    this.logger.info({ name: 'bud.api', "function": 'bud.projectPath', dir: dir }, "bud.projectPath called");
    this.paths.set('project', dir);
    return this;
};
exports.projectPath = projectPath;
//# sourceMappingURL=projectPath.js.map