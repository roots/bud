"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPlugins = void 0;
/**
 * Merge babel plugins
 */
const setPlugins = function (plugins) {
    this.build.items.set('babel.options.plugins', plugins);
    return this;
};
exports.setPlugins = setPlugins;
//# sourceMappingURL=setPlugins.js.map