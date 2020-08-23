"use strict";
exports.__esModule = true;
exports.paths = void 0;
var path_1 = require("path");
var yargs_1 = require("yargs");
/**
 * Current working dir
 */
var cwd = process.cwd();
/**
 * Bud framework dir.
 */
var framework = path_1.resolve(__dirname, '../');
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
        src: yargs_1.argv['src'] ? path_1.join(cwd, ensureStr(yargs_1.argv['src'])) : path_1.join(cwd),
        public: yargs_1.argv['public'] ? ensureStr(yargs_1.argv['public']) : '/',
        dist: yargs_1.argv['dist']
            ? path_1.join(cwd, ensureStr(yargs_1.argv['dist']))
            : path_1.join(cwd)
    }
};
exports.paths = paths;
//# sourceMappingURL=paths.js.map