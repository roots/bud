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
var vendor = function (name) {
    this.logger.info({ name: 'bud.api', "function": 'bud.vendor', options: { name: name } }, "bud.vendor called");
    this.features.enable('vendor');
    this.options.set('vendor', __assign(__assign({}, this.options.get('vendor')), { name: name !== null && name !== void 0 ? name : 'vendor' }));
    return this;
};
export { vendor };
//# sourceMappingURL=vendor.js.map