"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePresets = void 0;
/**
 * Merge babel presets
 */
const mergePresets = function (presets) {
    this.build.items.merge('babel.options.presets', presets.map(preset => typeof preset === 'object' ? preset : [preset]));
    return this;
};
exports.mergePresets = mergePresets;
//# sourceMappingURL=mergePresets.js.map