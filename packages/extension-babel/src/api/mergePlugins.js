"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePlugins = void 0;
/**
 * Merge babel plugins
 */
const mergePlugins = function (plugins) {
    this.build.items.merge('babel.options.plugins', plugins.map(plugin => typeof plugin === 'object' ? plugin : [plugin]));
    return this;
};
exports.mergePlugins = mergePlugins;
//# sourceMappingURL=mergePlugins.js.map