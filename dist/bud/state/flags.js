"use strict";
exports.__esModule = true;
exports.flagsRepository = void 0;
var yargs_1 = require("yargs");
/**
 * Resolve a value from CLI, envvar or a fallback.
 *
 * Order of precedence:
 *  - cli
 *  - env
 *  - fallback
 */
var flag = function (argKey, env, fallback) {
    var _a;
    var fromCli = yargs_1.argv && argKey ? yargs_1.argv[argKey] : null;
    var fromEnv = env !== null && env !== void 0 ? env : null;
    return (_a = fromCli !== null && fromCli !== void 0 ? fromCli : fromEnv) !== null && _a !== void 0 ? _a : fallback;
};
var flagsRepository = function (framework) {
    var env = framework.env;
    return {
        mode: flag('env', env.get('APP_ENV'), 'none'),
        hot: flag('hot', env.get('APP_DEV_HOT'), false),
        watch: flag('watch', env.get('APP_DEV_WATCH'), false),
        host: flag('host', env.get('APP_DEV_HOST'), false),
        port: flag('port', env.get('APP_DEV_PORT'), null),
        proxy: flag('proxy', env.get('APP_DEV_PROXY'), null),
        src: flag('src', env.get('APP_SRC'), null),
        dist: flag('dist', env.get('APP_DIST'), null),
        feature: flag('feature', env.get('APP_BUILD_FEATURE'), null)
    };
};
exports.flagsRepository = flagsRepository;
//# sourceMappingURL=flags.js.map