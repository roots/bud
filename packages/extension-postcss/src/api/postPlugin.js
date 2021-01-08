"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPlugin = void 0;
const postPlugin = function (plugin, options = {}) {
    this.build.items.merge('postcss.options.postcssOptions.plugins', [plugin, options]);
    return this;
};
exports.postPlugin = postPlugin;
//# sourceMappingURL=postPlugin.js.map