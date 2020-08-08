var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var bundle = function (name, entries) {
    var _a;
    this.logger.info({ name: 'bud.api', "function": 'bud.bundle', entries: entries }, "bud.bundle called");
    this.hooks.call('api.bundle.pre', { name: name, entries: entries });
    /**
     * Lazy load whatever loaders are needed to fulfill the
     * bundle requirements.
     */
    this.util.usedExt(entries, this);
    this.options.set('entry', __assign(__assign({}, this.options.get('entry')), this.hooks.filter('api.bundle.filter', (_a = {},
        _a["" + name] = entries,
        _a))));
    this.hooks.call('api.bundle.post');
    return this;
};
export { bundle };
//# sourceMappingURL=bundle.js.map