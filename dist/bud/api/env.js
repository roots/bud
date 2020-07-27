"use strict";
exports.__esModule = true;
exports.env = void 0;
/**
 * Get environment variable value.
 *
 * ```js
 * bud.env('APP_NAME')
 * ```
 *
 * @param   {string} key
 * @return  {string}
 */
var env = function (key) {
    return this.state.options.env[key]
        ? this.state.options.env[key]
        : null;
};
exports.env = env;
//# sourceMappingURL=env.js.map