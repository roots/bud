"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.logger = void 0;
var pino_1 = __importDefault(require("pino"));
var yargs_1 = require("yargs");
var log = yargs_1.argv.log;
var destination = (yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.log) && typeof yargs_1.argv.log == 'boolean' ? false : log;
var logger = pino_1["default"]({
    base: null,
    enabled: yargs_1.argv.hasOwnProperty('log') ? true : false,
    prettyPrint: {
        colorize: true
    }
}, destination);
exports.logger = logger;
//# sourceMappingURL=logger.js.map