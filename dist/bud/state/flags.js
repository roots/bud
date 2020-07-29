"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.flags = void 0;
var yargs_1 = require("yargs");
var env_1 = require("./env");
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
var flags = {
    repository: {
        mode: flag(['env', 'APP_ENV', 'none']),
        hot: flag(['hot', 'APP_DEV_HOT', false]),
        watch: flag(['watch', 'APP_DEV_WATCH', false]),
        host: flag(['host', 'APP_DEV_HOST', false]),
        port: flag(['port', 'APP_DEV_PORT', null]),
        proxy: flag(['proxy', 'APP_DEV_PROXY', null]),
        src: flag(['src', 'APP_SRC', null]),
        dist: flag(['dist', 'APP_DIST', null]),
        feature: flag(['feature', 'APP_BUILD_FEATURE', null])
    },
    get: function (flag) {
        return this.repository[flag];
    },
    set: function (flags) {
        this.repository = __assign(__assign({}, this.repository), flags);
    },
    has: function (flag) {
        return this.repository.hasOwnProperty(flag);
    },
    is: function (flag, value) {
        return this.get(flag) === value;
    }
};
exports.flags = flags;
//# sourceMappingURL=flags.js.map