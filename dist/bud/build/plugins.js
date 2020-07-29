"use strict";
exports.__esModule = true;
exports.plugins = void 0;
/**
 * Webpack plugins.
 */
var plugins = function (bud) { return ({
    bud: bud,
    controller: bud.plugin.controller,
    adapters: bud.state.plugins.adapters,
    make: function () {
        var _this = this;
        this.doHook('pre');
        this.plugins = this.adapters
            .map(function (plugin) {
            return _this.controller
                .initController(plugin)
                .buildPlugin();
        })
            .filter(function (plugin) { return plugin !== undefined; });
        this.doHook('post');
        return {
            plugins: this.plugins
        };
    },
    doHook: function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.bud.hooks.call(name + "_plugins", this, params);
    }
}); };
exports.plugins = plugins;
//# sourceMappingURL=plugins.js.map