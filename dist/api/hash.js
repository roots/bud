var hash = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.logger.info({ name: 'bud.api', "function": 'bud.hash', enabled: enabled }, "bud.hash called");
    this.features.set('hash', enabled);
    return this;
};
export { hash };
//# sourceMappingURL=hash.js.map