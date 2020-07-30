"use strict";
exports.__esModule = true;
exports.plugins = void 0;
/**
 * Webpack plugins.
 */
var plugins = function (bud) { return ({
    bud: bud,
    make: function () {
        this.doHook('adapters_init');
        this.doHook('adapters_build');
        this.doHook('adapters_yield');
        return {
            plugins: this.bud.plugins.repository.adapters
        };
    },
    doHook: function (name) {
        this.bud.hooks.call(name, this.bud);
    }
}); };
exports.plugins = plugins;
//# sourceMappingURL=plugins.js.map