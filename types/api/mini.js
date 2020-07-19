"use strict";
var _this = this;
exports.__esModule = true;
exports.mini = void 0;
/**
 * Enable or disable minification
 *
 * @param  {boolean} enable - true to enable CSS/JS minification.
 * @return {typeof import('./../index')} bud
 */
var mini = function (enable) {
    _this.features.minified = enable;
    return _this;
};
exports.mini = mini;
