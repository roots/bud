"use strict";
exports.__esModule = true;
exports.plugins = void 0;
var plugins = function (bud) { return ({
    bud: bud,
    adapters: bud.adapters.entries(),
    controller: bud.adapters.controller(bud),
    make: function () {
        var _this = this;
        this.adapters = this.adapters.map(function (adapter) { return _this.controller.build(adapter); });
        return {
            plugins: this.adapters.filter(function (adapter) { return adapter; })
        };
    }
}); };
exports.plugins = plugins;
//# sourceMappingURL=plugins.js.map