"use strict";
exports.__esModule = true;
exports.use = void 0;
var use = function (plugins) {
    var _this = this;
    this.logger.info({
        name: 'api.use',
        plugins: plugins.map(function (ext) { return ext.name; })
    }, 'api.use called');
    plugins.forEach(function (plugin) {
        _this.plugins.add({
            name: plugin.name,
            extension: plugin
        });
    });
    var controller = this.plugins.controller(this);
    this.plugins.entries().map(function (plugin) {
        controller.build(plugin);
    });
    return this;
};
exports.use = use;
//# sourceMappingURL=use.js.map