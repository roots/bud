"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bud_support_1 = require("@roots/bud-support");
/**
 * CLI arg for log might be:
 * - a boolean (whether or not to log at all)
 * - a string (relpath to output file for logger)
 */
const log = bud_support_1.yargs.argv.log;
/**
 * Ducktype the log argv
 */
const destination = ((_a = bud_support_1.yargs.argv) === null || _a === void 0 ? void 0 : _a.log) && typeof bud_support_1.yargs.argv.log == 'boolean'
    ? false
    : log;
/**
 * Instantiate the logger.
 */
const Logger = bud_support_1.pino({
    base: null,
    enabled: bud_support_1.yargs.argv.hasOwnProperty('log') ? true : false,
    prettyPrint: {
        colorize: !destination ? true : false,
    },
}, bud_support_1.pino.destination());
exports.default = Logger;
//# sourceMappingURL=index.js.map