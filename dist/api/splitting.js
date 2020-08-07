var splitting = function (enabled) {
    this.logger.info({ name: 'bud.api', "function": 'bud.splitting', enabled: enabled }, "bud.splitting called");
    this.features.set('splitting', enabled !== null && enabled !== void 0 ? enabled : true);
    return this;
};
export { splitting };
//# sourceMappingURL=splitting.js.map