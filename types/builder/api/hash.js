"use strict";
exports.__esModule = true;
exports.hash = void 0;
/**
 * Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.
 * @example bud.hash(true) // enable
 * @param   {boolean} enabled - true to enable filename hashing.
 * @return  {typeof import('./../index')} bud
 */
var hash = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.features.hash = enabled;
    return this;
};
exports.hash = hash;
