"use strict";
exports.__esModule = true;
exports.debug = void 0;
/**
 * Debug mode
 *
 * @param   {boolean} enabled - true to enable debug mode
 * @return  {typeof import('./../index')} debug
 */
var debug = function (enabled) {
    this.features.debug = enabled;
    return this;
};
exports.debug = debug;
