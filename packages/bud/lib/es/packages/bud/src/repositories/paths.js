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
import { resolve, join } from 'path';
import { argv } from 'yargs';

/**
 * Current working dir
 */
var cwd = process.cwd();
/**
 * Bud framework dir.
 */
var framework = resolve(__dirname, '../');
/**
 * Src arg
 */
var ensureStr = function (possibleStr) {
    return possibleStr ? possibleStr : '';
};
/**
 * Paths repo.
 */
var paths = {
    name: 'paths',
    register: {
        cwd: cwd,
        project: cwd,
        framework: framework,
        src: argv['src'] ? join(cwd, ensureStr(argv['src'])) : join(cwd),
        public: argv['public'] ? ensureStr(argv['public']) : '/',
        dist: argv['dist']
            ? join(cwd, ensureStr(argv['dist']))
            : join(cwd),
    },
};

export { paths };
