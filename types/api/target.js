"use strict";
exports.__esModule = true;
exports.target = void 0;
/**
 * Set the build target.
 * @example bud.target('web') // default
 * @param   {string} dir - path of src directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
var target = function (target) {
    this.options.target = target;
    return this;
};
exports.target = target;
