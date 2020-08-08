import { join, resolve } from 'path';
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
    cwd: cwd,
    project: cwd,
    framework: framework,
    src: argv['src'] ? join(cwd, ensureStr(argv['src'])) : join(cwd),
    dist: argv['dist'] ? join(cwd, ensureStr(argv['dist'])) : join(cwd),
    public: argv['public'] ? ensureStr(argv['public']) : '/'
};
export { paths };
//# sourceMappingURL=paths.js.map