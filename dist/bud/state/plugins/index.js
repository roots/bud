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
    indexOfPlugin: function (name) {
        return this.repository.core.indexOf(this.repository.core.filter(function (plugin) { return plugin[0] == name; })[0]);
    },
    getPlugin: function (name) {
        return this.repository.core[name];
    },
    addPlugin: function (plugin) {
        this.repository.core.push(plugin);
    },
    setPlugin: function (name, plugin) {
        this.repository.core
            .filter(function (_a) {
            var pluginName = _a[0];
            return pluginName == name;
        })
            .map(function () { return [name, plugin]; });
    },
    deletePlugin: function (name) {
        this.repository.core
            .filter(function (_a) {
            var pluginName = _a[0];
            return pluginName == name;
        })
            .forEach(function (_a) {
            var pluginName = _a[0];
            delete this.repository.core[this.indexOfPlugin(pluginName)];
        });
    },
    hasPlugin: function (name) {
        return (this.repository.core.filter(function (_a) {
            var pluginName = _a[0];
            return pluginName == name;
        }).length > 0);
    },
    indexOfAdapter: function (name) {
        return this.repository.adapters.indexOf(this.repository.adapters.filter(function (adapter) { return adapter[0] == name; })[0]);
    },
    getAdapter: function (name) {
        return this.repository.adapters[name];
    },
    addAdapter: function (adapter) {
        this.repository.adapters.push(adapter);
    },
    setAdapter: function (name, plugin) {
        this.repository.adapters
            .filter(function (_a) {
            var adapterName = _a[0];
            return adapterName == name;
        })
            .map(function () { return [name, plugin]; });
    },
    deleteAdapter: function (name) {
        this.repository.adapters
            .filter(function (_a) {
            var adapterName = _a[0];
            return adapterName == name;
        })
            .forEach(function (_a) {
            var adapterName = _a[0];
            delete this
                .repository.adapters[this.indexOfAdapter(adapterName)];
        });
    },
    hasAdapter: function (name) {
        return (this.repository.adapters.filter(function (_a) {
            var adapterName = _a[0];
            return adapterName == name;
        }).length > 0);
    }
};
exports.plugins = plugins;
//# sourceMappingURL=index.js.map