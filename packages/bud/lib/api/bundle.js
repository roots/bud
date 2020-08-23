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
exports.bundle = void 0;
var bundle = function (name, entries) {
    var _a;
    this.util.usedExt(entries, this);
    this.options.set('webpack.entry', __assign(__assign({}, this.options.get('webpack.entry')), this.hooks.filter('api.bundle.filter', (_a = {},
        _a["" + name] = entries,
        _a))));
    return this;
};
exports.bundle = bundle;
//# sourceMappingURL=bundle.js.map