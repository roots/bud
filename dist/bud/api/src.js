"use strict";
exports.__esModule = true;
exports.src = void 0;
var src = function (path) {
    var srcDir = this.paths.get('src');
    return path ? this.fs.path.join(srcDir, path) : srcDir;
};
exports.src = src;
//# sourceMappingURL=src.js.map