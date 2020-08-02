"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.logger = void 0;
var pino_1 = __importDefault(require("pino"));
var yargs_1 = require("yargs");
var logger = pino_1["default"]({
    base: null,
    dest: yargs_1.argv['log'] && yargs_1.argv['log'] ? yargs_1.argv['log'] : false,
    enabled: yargs_1.argv['log'] ? true : false,
    prettyPrint: {
        colorize: true
    }
});
exports.logger = logger;
//# sourceMappingURL=logger.js.map