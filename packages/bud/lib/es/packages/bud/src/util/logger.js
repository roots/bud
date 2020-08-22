/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
import pino from 'pino';
import { argv } from 'yargs';

var log = argv.log;
var destination = (argv === null || argv === void 0 ? void 0 : argv.log) && typeof argv.log == 'boolean' ? false : log;
var logger = pino({
    base: null,
    enabled: argv.hasOwnProperty('log') ? true : false,
    prettyPrint: {
        colorize: !destination ? true : false,
    },
}, destination);

export { logger };
