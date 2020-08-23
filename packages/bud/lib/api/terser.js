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
exports.terser = void 0;
var terser = function (options) {
    if (options) {
        this.options.set('webpack.plugins.terser', __assign(__assign({}, this.options.get('webpack.plugins.terser')), options));
    }
    return this;
};
exports.terser = terser;
//# sourceMappingURL=terser.js.map