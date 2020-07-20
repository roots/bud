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
var _this = this;
exports.__esModule = true;
exports.dev = void 0;
/**
 * Development server settings
 * @param   {object} options
 * @return  {typeof import('./../index')} bud
 */
var dev = function (options) {
    _this.options.dev = __assign(__assign({}, _this.options.dev), options);
    return _this;
};
exports.dev = dev;
