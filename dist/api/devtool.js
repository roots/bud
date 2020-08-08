var devtool = function (devtool) {
    this.logger.info({ name: 'bud.api', "function": 'bud.devtool', devtool: devtool }, "bud.devtool called");
    this.options.set('devtool', devtool);
    return this;
};
export { devtool };
//# sourceMappingURL=devtool.js.map