"use strict";
exports.__esModule = true;
exports.resolve = void 0;
var path_1 = require("path");
var resolve = function (moduleName) {
    return require.resolve(path_1.join(this.state.paths.framework, 'node_modules', moduleName));
};
exports.resolve = resolve;
//# sourceMappingURL=resolve.js.map