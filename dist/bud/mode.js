"use strict";
var _a;
exports.__esModule = true;
exports.mode = exports.inProduction = exports.arguments = void 0;
var yargs_1 = require("yargs");
exports.arguments = yargs_1.argv;
var env_1 = require("./state/env");
/**
 * Env
 */
var envFallback = 'none';
var envArgument = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.env;
var envProject = env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.APP_ENV;
/**
 * Mode
 */
var mode = (_a = envProject !== null && envProject !== void 0 ? envProject : envArgument) !== null && _a !== void 0 ? _a : envFallback;
exports.mode = mode;
var inProduction = mode === 'production';
exports.inProduction = inProduction;
//# sourceMappingURL=mode.js.map