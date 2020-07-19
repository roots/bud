"use strict";
var _this = this;
exports.__esModule = true;
exports.watch = void 0;
/**
 * ## bud.watch
 *
 * Enable or disable watch mode.
 *
 * ```js
 * bud.watch(true)
 * ```
 *
 * @param   {bool} enabled - true if enabled
 * @return  {typeof import('./../index')} bud
 */
var watch = function (enabled) {
    _this.features.watch = enabled;
    return _this;
};
exports.watch = watch;
