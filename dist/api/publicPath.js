var publicPath = function (dir) {
    this.logger.info({ name: 'bud.api', "function": 'bud.publicPath', dir: dir }, "bud.publicPath called");
    this.paths.set('public', dir);
    return this;
};
export { publicPath };
//# sourceMappingURL=publicPath.js.map