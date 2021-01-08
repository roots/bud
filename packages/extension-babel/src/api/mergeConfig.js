"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeConfig = void 0;
/**
 * Merge babel transformOptions
 */
const mergeConfig = function (opts) {
    opts.presets &&
        this.build.items.merge('babel.options.presets', opts.presets.map(preset => typeof preset === 'object' ? preset : [preset]));
    opts.plugins &&
        this.build.items.merge('babel.options.plugins', opts.plugins.map(plugins => typeof plugins === 'object' ? plugins : [plugins]));
    this.build.items.merge('babel.options', opts);
    return this;
};
exports.mergeConfig = mergeConfig;
//# sourceMappingURL=mergeConfig.js.map