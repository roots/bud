var config = function () {
    this.logger.info({ name: 'bud.api', "function": 'bud.config' }, "bud.config called");
    var compiler = this.hooks.filter('bud.compiler.filter', this.compiler);
    return compiler.buildConfig();
};
export { config };
//# sourceMappingURL=config.js.map