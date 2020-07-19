"use strict";
exports.__esModule = true;
exports.dump = void 0;
/**
 * Dump generated webpack config for debugging
 *
 * @example bud.dump(true) // dumps the generated webpack config and stops the build from running.
 * @param   {boolean} enabled - true to dump config
 * @return    {typeof import('./../index')} bud
 */
var dump = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.features.dump = enabled;
    return this;
};
exports.dump = dump;
