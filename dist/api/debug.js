var debug = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    !enabled ? this.features.disable('debug') : this.features.enable('debug');
    return this;
};
export { debug };
//# sourceMappingURL=debug.js.map