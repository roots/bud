var mini = function (enable) {
    if (enable === void 0) { enable = true; }
    this.logger.info({ name: 'bud.api', "function": 'bud.mini', enable: enable }, "bud.mini called");
    this.features.set('minify', enable);
    return this;
};
export { mini };
//# sourceMappingURL=mini.js.map