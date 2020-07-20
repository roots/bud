"use strict";
exports.__esModule = true;
exports.mode = exports.inProduction = exports.argv = void 0;
var yargs_1 = require("yargs");
exports.argv = yargs_1.argv;
var env_1 = require("./env");
/**
 * bud.mode
 *
 * Webpack mode ('development'|'production')
 *
 * Determined by the first match, in order of precedence:
 *
 *  - CLI args
 *  - env file
 *  - fallback ('production')
 */
var mode = (yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.env) ? yargs_1.argv.env
    : (env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.APP_ENV) ? env_1.env.APP_ENV
        : 'production';
exports.mode = mode;
/**
 * inProduction
 */
var inProduction = mode == 'production';
exports.inProduction = inProduction;
