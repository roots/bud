"use strict";
exports.__esModule = true;
exports.preset = void 0;
var preset = function (presetKey) {
    this.logger.info({ name: 'bud.api', "function": 'bud.preset', presetKey: presetKey }, "bud.preset called");
    if (!this.presets.has(presetKey)) {
        this.logger.error({ name: 'api.preset', presetKey: presetKey }, "Preset key doesn't exist in presets repository.");
    }
    var presetPath = this.presets.get(presetKey);
    if (!presetPath) {
        this.logger.error({ name: 'api.preset', presetKey: presetKey }, "Preset key is not valid.");
    }
    return require(presetPath);
};
exports.preset = preset;
//# sourceMappingURL=preset.js.map