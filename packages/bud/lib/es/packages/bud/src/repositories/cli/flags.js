/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
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
import { argv } from 'yargs';

var flags = {
    name: 'flags',
    register: {
        log: argv.hasOwnProperty('log'),
        hot: argv.hasOwnProperty('hot'),
        watch: argv.hasOwnProperty('watch'),
    },
};

export { flags };
