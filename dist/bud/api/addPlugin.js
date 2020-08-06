"use strict";
exports.__esModule = true;
exports.addPlugin = void 0;
var addPlugin = function (plugin) {
    this.logger.info({
        name: 'bud.api',
        "function": 'bud.addPlugin',
        plugin: plugin
    }, 'bud.addPlugin called');
    this.plugins.set(plugin.name, plugin);
    return this;
};
exports.addPlugin = addPlugin;
//# sourceMappingURL=addPlugin.js.map