"use strict";
var _a;
exports.__esModule = true;
exports.watch = exports.feature = exports.dist = exports.src = exports.port = exports.host = exports.hot = exports.mode = exports.inProduction = exports.arguments = void 0;
var yargs_1 = require("yargs");
exports.arguments = yargs_1.argv;
var env_1 = require("./state/env");
/**
 * --env
 */
var envFallback = 'none';
var envArgument = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.env;
var envProject = env_1.env === null || env_1.env === void 0 ? void 0 : env_1.env.APP_ENV;
var mode = (_a = envProject !== null && envProject !== void 0 ? envProject : envArgument) !== null && _a !== void 0 ? _a : envFallback;
exports.mode = mode;
var inProduction = mode === 'production';
exports.inProduction = inProduction;
/**
 * --hot
 */
var hotFallback = null;
var hotArgument = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.hot;
var hot = hotArgument !== null && hotArgument !== void 0 ? hotArgument : hotFallback;
exports.hot = hot;
/**
 * --watch
 */
var watchFallback = null;
var watchArgument = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.watch;
var watch = watchArgument !== null && watchArgument !== void 0 ? watchArgument : watchFallback;
exports.watch = watch;
/**
 * --host
 */
var hostFallback = null;
var hostArgument = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.watch;
var host = hostArgument !== null && hostArgument !== void 0 ? hostArgument : hostFallback;
exports.host = host;
/**
 * --port
 */
var portFallback = null;
var portArgument = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.watch;
var port = portArgument !== null && portArgument !== void 0 ? portArgument : portFallback;
exports.port = port;
/**
 * --src
 */
var srcFallback = null;
var srcArgument = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.watch;
var src = srcArgument !== null && srcArgument !== void 0 ? srcArgument : srcFallback;
exports.src = src;
/**
 * --dist
 */
var distFallback = null;
var distArgument = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.watch;
var dist = distArgument !== null && distArgument !== void 0 ? distArgument : distFallback;
exports.dist = dist;
/**
 * --feature
 */
var featureFallback = null;
var featureArgument = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.watch;
var feature = featureArgument !== null && featureArgument !== void 0 ? featureArgument : featureFallback;
exports.feature = feature;
//# sourceMappingURL=flags.js.map