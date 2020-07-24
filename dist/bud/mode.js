"use strict";
exports.__esModule = true;
exports.mode = exports.inProduction = exports.arguments = void 0;
var yargs_1 = require("yargs");
exports.arguments = yargs_1.argv;
var env_1 = require("./state/env");
/**
 * Fallback env
 */
var envFallback = 'production';
/**
 * specified via CLI arg
 */
var envArgument = yargs_1.argv.env;
/**
 * specified via project .env
 */
var envProject = (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.APP_ENV) || envFallback;
/**
 * ## bud.mode
 *
 * Webpack mode ('development'|'production')
 *
 * Determined by the first match, in order of precedence:
 *
 *  - CLI args
 *  - env file
 *
 * Fallback is 'production'.
 */
var mode = envArgument ? envArgument : envProject;
exports.mode = mode;
/**
 * ## bud.inProduction
 *
 * True if bud.mode is strictly equal to "production"
 */
var inProduction = mode === 'production';
exports.inProduction = inProduction;
//# sourceMappingURL=mode.js.map