"use strict";
exports.__esModule = true;
exports.preset = void 0;
var preset = function (presetKey) {
    return require(this.presets.get(presetKey));
};
exports.preset = preset;
//# sourceMappingURL=preset.js.map