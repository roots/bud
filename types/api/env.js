"use strict";
exports.__esModule = true;
exports.env = void 0;
/**
 * Get environment variable value.
 * @example bud.env('APP_NAME')
 * @param   {string} key
 * @return  {string}
 */
var env = function (key) {
    return this.options.env[key]
        ? this.options.env[key]
        : null;
};
exports.env = env;
