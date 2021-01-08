"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPresets = void 0;
/**
 * Merge babel plugins
 */
const setPresets = function (presets) {
    this.build.items.set('babel.options.presets', presets);
    return this;
};
exports.setPresets = setPresets;
//# sourceMappingURL=setPresets.js.map