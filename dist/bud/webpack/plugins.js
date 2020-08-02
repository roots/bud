"use strict";
exports.__esModule = true;
exports.plugins = void 0;
var plugins = function (bud) { return ({
    bud: bud,
    adapters: bud.adapters.entries(),
    controller: bud.adapters.controller(bud),
    target: {
        plugins: []
    },
    make: function () {
        var _this = this;
        this.target.plugins = this.adapters
            .map(function (adapter) { return _this.controller.build(adapter); })
            .filter(function (adapter) { return adapter; });
        this.target = this.bud.hooks.filter('webpack.plugins', this.target);
        this.bud.logger.info({ name: 'webpack.plugins', value: this.target }, "generated");
        return this.target;
    }
}); };
exports.plugins = plugins;
//# sourceMappingURL=plugins.js.map