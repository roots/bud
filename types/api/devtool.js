"use strict";
var _this = this;
exports.__esModule = true;
exports.devtool = void 0;
/**
 * Specify webpack devtool
 * @param   {string} devtool - webpack devtool to utilize
 * @return  {typeof import('./../index')} bud
 */
var devtool = function (devtool) {
    _this.options.devtool = devtool;
    return _this;
};
exports.devtool = devtool;
