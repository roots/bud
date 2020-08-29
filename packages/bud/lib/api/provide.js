"use strict";
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
exports.__esModule = true;
exports.provide = void 0;
var provide = function (options) {
    var _this = this;
    Object.entries(options).forEach(function (_a) {
        var _b;
        var key = _a[0], modules = _a[1];
        var isString = typeof modules == 'string';
        var isObject = typeof modules == 'object';
        isString &&
            _this.options.set('webpack.plugins.provide', __assign(__assign({}, _this.options.get('webpack.plugins.provide')), (_b = {}, _b["" + modules] = key, _b)));
        isObject &&
            modules.map(function (handle) {
                var _a;
                _this.options.set('webpack.plugins.provide', __assign(__assign({}, _this.options.get('webpack.plugins.provide')), (_a = {}, _a[handle] = key, _a)));
            });
    });
    return this;
};
exports.provide = provide;
//# sourceMappingURL=provide.js.map