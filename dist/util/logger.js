import pino from 'pino';
import { argv } from 'yargs';
var log = argv.log;
var destination = (argv === null || argv === void 0 ? void 0 : argv.log) && typeof argv.log == 'boolean' ? false : log;
var logger = pino({
    base: null,
    enabled: argv.hasOwnProperty('log') ? true : false,
    prettyPrint: {
        colorize: !destination ? true : false
    }
}, destination);
export { logger };
//# sourceMappingURL=logger.js.map