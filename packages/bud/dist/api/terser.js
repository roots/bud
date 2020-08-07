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
var terser = function (options) {
    var _a;
    this.logger.info(__assign({ name: 'bud.api', "function": 'bud.watch' }, options), "bud.watch called");
    this.features.set('terser', (_a = options === null || options === void 0 ? void 0 : options.enable) !== null && _a !== void 0 ? _a : true);
    (options === null || options === void 0 ? void 0 : options.terser) && this.options.set('terser', options.terser);
    return this;
};
export { terser };
//# sourceMappingURL=terser.js.map