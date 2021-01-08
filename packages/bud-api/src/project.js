"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.project = void 0;
const project = function (segment) {
    var _a;
    return segment
        ? this.disk.path.join(this.disk.baseDir, segment)
        : (_a = this.disk.baseDir) !== null && _a !== void 0 ? _a : process.cwd();
};
exports.project = project;
//# sourceMappingURL=project.js.map