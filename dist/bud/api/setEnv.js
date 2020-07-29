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
exports.setEnv = void 0;
/**
 * @todo env
 */
var setEnv = function (options) {
    this.state.options.env = __assign(__assign({}, this.state.options.env), options);
    return this;
};
exports.setEnv = setEnv;
//# sourceMappingURL=setEnv.js.map