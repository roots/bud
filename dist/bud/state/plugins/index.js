"use strict";
exports.__esModule = true;
exports.plugins = void 0;
var controller_1 = require("./controller");
var core_1 = require("./core");
var adapters_1 = require("./adapters");
/**
 * ## bud.state.Plugins
 */
var plugins = {
    repository: {
        adapters: adapters_1.adapters,
        core: core_1.core
    },
    controller: controller_1.controller,
    getPlugin: function (name) {
        return this.repository.adapters[name];
    },
    setPlugin: function (name, plugin) {
        this.repository.adapters[name] = plugin;
    },
    deletePlugin: function (name) {
        this.hasPlugin(name) && delete this.repository.adapters[name];
    },
    hasPlugin: function (name) {
        return this.repository.adapters.hasOwnProperty(name);
    },
    getAdapter: function (name) {
        return this.repository.adapters[name];
    },
    setAdapter: function (name, plugin) {
        this.repository.adapters[name] = plugin;
    },
    deleteAdapter: function (name) {
        this.hasAdapter(name) && delete this.repository.adapters[name];
    },
    hasAdapter: function (name) {
        return this.repository.adapters.hasOwnProperty(name);
    }
};
exports.plugins = plugins;
//# sourceMappingURL=index.js.map