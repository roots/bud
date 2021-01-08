"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlugin = void 0;
/**
 * Merge babel plugins
 */
const addPlugin = function (name, opts) {
    const plugin = [name];
    opts && plugin.push(opts);
    this.bud.build.items.merge('babel.options.plugins', [plugin]);
    return this;
};
exports.addPlugin = addPlugin;
//# sourceMappingURL=addPlugin.js.map