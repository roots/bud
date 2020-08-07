var _a, _b;
import { join, resolve } from 'path';
import { argv } from 'yargs';
import { projectRoot } from '../util/projectRoot';
/**
 * Current working dir
 */
var cwd = process.cwd();
/**
 * Project directory.
 */
var project = projectRoot;
/**
 * Bud framework dir.
 */
var framework = resolve(__dirname, '../');
/**
 * Src arg
 */
var srcArg = argv.src;
var paths = {
    cwd: cwd,
    project: cwd,
    framework: framework,
    src: srcArg && typeof srcArg == 'string' ? join(cwd, srcArg) : join(cwd),
    dist: (_a = argv === null || argv === void 0 ? void 0 : argv.dist) !== null && _a !== void 0 ? _a : project,
    public: (_b = argv === null || argv === void 0 ? void 0 : argv.public) !== null && _b !== void 0 ? _b : '/'
};
export { paths };
//# sourceMappingURL=paths.js.map