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
exports.babel = void 0;
var babel = function (options) {
    this.state.features.babel = true;
    this.state.options.babel = __assign(__assign({}, this.state.options.babel), options);
    return this;
};
exports.babel = babel;
//# sourceMappingURL=babel.js.map