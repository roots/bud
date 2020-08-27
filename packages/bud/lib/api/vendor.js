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
exports.vendor = void 0;
var vendor = function (options) {
    this.features.set('splitChunks', options && options.hasOwnProperty('enabled')
        ? options.enabled
        : true);
    options &&
        this.options.set('webpack.optimization.splitChunks.cacheGroups.vendor', __assign(__assign({}, this.options.get('webpack.optimization.splitChunks.cacheGroups.vendor')), options));
    return this;
};
exports.vendor = vendor;
//# sourceMappingURL=vendor.js.map