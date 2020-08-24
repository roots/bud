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
var use = function (bud) { return ({
    loader: require.resolve('sass-loader'),
    options: __assign(__assign({}, bud.options.get('sass')), { sourceMap: true, implementation: (function () {
            try {
                if (require.resolve('sass')) {
                    return require('sass');
                }
            }
            catch (_a) {
                return require('node-sass');
            }
        })() })
}); };
exports["default"] = use;
//# sourceMappingURL=use.js.map