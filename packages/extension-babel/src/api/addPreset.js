"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPreset = void 0;
/**
 * Merge babel plugins
 */
const addPreset = function (name, opts) {
    const preset = [name];
    opts && preset.push(opts);
    this.bud.build.items.merge('babel.options.presets', preset);
    return this;
};
exports.addPreset = addPreset;
//# sourceMappingURL=addPreset.js.map