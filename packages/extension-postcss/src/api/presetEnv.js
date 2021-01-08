"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presetEnv = void 0;
const presetEnv = function (options = {}) {
    const plugins = this.build.items.get('postcss.options.postcssOptions.plugins');
    // plugins[0]: flexbugs
    // plugins[1]: preset-env
    // plugins[2]: postcss-nested
    plugins[1][1] = options;
    this.build.items.set('postcss.options.postcssOptions.plugins', plugins);
    return this;
};
exports.presetEnv = presetEnv;
//# sourceMappingURL=presetEnv.js.map