"use strict";
exports.__esModule = true;
exports.preset = void 0;
var path_1 = require("path");
var preset = function (relativePath) {
    var presetConfig = path_1.join(this.paths.get('framework'), 'preset', relativePath);
    return require(presetConfig);
};
exports.preset = preset;
//# sourceMappingURL=preset.js.map