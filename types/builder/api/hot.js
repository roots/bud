"use strict";
var _this = this;
exports.__esModule = true;
exports.hot = void 0;
/**
 * ## bud.hot
 *
 * Enable or disable hot module reloading
 *
 * ```js
 * bud.hot(true) // enable HMR
 * ```
 *
 * @param   {boolean} enabled - true to enable hot module reloading. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
var hot = function (enabled) {
    _this.features.hot = enabled;
    return _this;
};
exports.hot = hot;
