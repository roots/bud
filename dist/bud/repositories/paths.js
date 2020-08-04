"use strict";
var _a, _b;
exports.__esModule = true;
exports.paths = void 0;
var path_1 = require("path");
var yargs_1 = require("yargs");
var projectRoot_1 = require("../util/projectRoot");
/**
 * Current working dir
 */
var cwd = process.cwd();
/**
 * Project directory.
 */
var project = projectRoot_1.projectRoot;
/**
 * Bud framework dir.
 */
var framework = path_1.resolve(__dirname, '../../../');
/**
 * Src arg
 */
var srcArg = yargs_1.argv.src;
var paths = {
    cwd: cwd,
    project: cwd,
    framework: framework,
    src: srcArg && typeof srcArg == 'string' ? path_1.join(cwd, srcArg) : path_1.join(cwd),
    dist: (_a = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.dist) !== null && _a !== void 0 ? _a : project,
    public: (_b = yargs_1.argv === null || yargs_1.argv === void 0 ? void 0 : yargs_1.argv.public) !== null && _b !== void 0 ? _b : '/'
};
exports.paths = paths;
//# sourceMappingURL=paths.js.map