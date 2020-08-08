var use = function (plugins) {
    var controller = this.plugins.controller(this);
    plugins.map(function (plugin) {
        controller.build(plugin);
    });
    return this;
};
export { use };
//# sourceMappingURL=use.js.map