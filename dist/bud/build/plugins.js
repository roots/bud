"use strict";
exports.__esModule = true;
exports.plugins = void 0;
/**
 * Webpack plugins.
 */
var plugins = function (bud) { return ({
    bud: bud,
    adapters: bud.adapters.entries(),
    make: function () {
        this.doHook('adapters_init');
        this.doHook('adapters_build');
        this.doHook('adapters_final');
        return {
            plugins: this.adapters
        };
    },
    doHook: function (name) {
        this.adapters = this.bud.hooks.filter("filter_" + name, this.adapters);
        this.bud.hooks.call(name, this.adapters);
    }
}); };
exports.plugins = plugins;
//# sourceMappingURL=plugins.js.map