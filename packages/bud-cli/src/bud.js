#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bud = void 0;
const bud_support_1 = require("@roots/bud-support");
const build = __importStar(require("./commands/build"));
const publish = __importStar(require("./commands/publish"));
/**
 * $bud
 */
const cli = bud_support_1.yargs
    .command(build)
    .command(publish)
    .recommendCommands()
    .demandCommand(1, 'You must specify a command. See `bud --help` for usage.\n')
    .usage('\nBud-CLI \n\nbud [command] [options]')
    .version()
    .wrap(bud_support_1.yargs.terminalWidth())
    .epilog('https://github.com/roots/bud').argv;
exports.bud = cli;
//# sourceMappingURL=bud.js.map