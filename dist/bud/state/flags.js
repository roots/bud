"use strict";
exports.__esModule = true;
exports.flags = void 0;
var yargs_1 = require("yargs");
var env_1 = require("./env");
var container_1 = require("../container");
/**
 * Resolve a value from CLI, envvar or a fallback.
 *
 * Order of precedence:
 *  - cli
 *  - env
 *  - fallback
 */
var flag = function (_a) {
    var _b;
    var argKey = _a[0], envKey = _a[1], fallback = _a[2];
    var fromCli = yargs_1.argv && argKey ? yargs_1.argv[argKey] : null;
    var fromEnv = env_1.env && envKey ? env_1.env[envKey] : null;
    return (_b = fromCli !== null && fromCli !== void 0 ? fromCli : fromEnv) !== null && _b !== void 0 ? _b : fallback;
};
/**
 * ## bud.state.flags
 *
 * Flags and arguments from CLI and env.
 */
var flags = new container_1.container({
    mode: flag(['env', 'APP_ENV', 'none']),
    hot: flag(['hot', 'APP_DEV_HOT', false]),
    watch: flag(['watch', 'APP_DEV_WATCH', false]),
    host: flag(['host', 'APP_DEV_HOST', false]),
    port: flag(['port', 'APP_DEV_PORT', null]),
    proxy: flag(['proxy', 'APP_DEV_PROXY', null]),
    src: flag(['src', 'APP_SRC', null]),
    dist: flag(['dist', 'APP_DIST', null]),
    feature: flag(['feature', 'APP_BUILD_FEATURE', null])
});
exports.flags = flags;
//# sourceMappingURL=flags.js.map