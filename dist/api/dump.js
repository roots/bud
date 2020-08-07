var dump = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.logger.info({ name: 'bud.api', "function": 'bud.dump', enabled: enabled }, "bud.dump called");
    this.features.set('dump', enabled);
    return this;
};
export { dump };
//# sourceMappingURL=dump.js.map