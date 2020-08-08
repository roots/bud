var compile = function () {
    this.logger.info({ name: 'bud.api', "function": 'bud.compile' }, "bud.compile called");
    var compiler = this.hooks.filter('bud.compiler.filter', this.compiler);
    compiler.buildConfig().compile();
};
export { compile };
//# sourceMappingURL=compile.js.map