"use strict";
exports.__esModule = true;
exports.doPlugins = void 0;
var doPlugins = function (bud) { return ({
    bud: bud,
    plugins: bud.plugins.entries(),
    controller: bud.plugins.controller(bud),
    make: function () {
        var _this = this;
        this.plugins.map(function (plugin) { return _this.controller.build(plugin); });
    }
}); };
exports.doPlugins = doPlugins;
//# sourceMappingURL=doPlugins.js.map