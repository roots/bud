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
var auto = function (options) {
    var _this = this;
    this.logger.info({ name: 'bud.api', "function": 'bud.auto', options: options }, "bud.auto called");
    this.hooks.call('api.auto.pre');
    Object.entries(options).forEach(function (_a) {
        var key = _a[0], modules = _a[1];
        modules.forEach(function (handle) {
            var _a;
            _this.options.set('auto', __assign(__assign({}, _this.options.get('auto')), (_a = {}, _a[handle] = key, _a)));
        });
    });
    this.hooks.call('api.auto.post');
    return this;
};
export { auto };
//# sourceMappingURL=auto.js.map