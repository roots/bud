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
exports.stylelint = void 0;
var stylelint = function (options) {
    var _a;
    this.features.set({ stylelint: (_a = options === null || options === void 0 ? void 0 : options.enabled) !== null && _a !== void 0 ? _a : true });
    this.features.enabled('stylelint')
        && this.options.set({
            stylelint: __assign({ configFile: this.configs.get('stylelint') }, options)
        });
    return this;
};
exports.stylelint = stylelint;
//# sourceMappingURL=stylelint.js.map