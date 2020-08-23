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
exports.alias = void 0;
var alias = function (options) {
    this.options.set('webpack.resolve.alias', __assign(__assign({}, this.options.get('webpack.resolve.alias')), this.hooks.filter('api.alias', options)));
    return this;
};
exports.alias = alias;
//# sourceMappingURL=alias.js.map