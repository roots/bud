"use strict";
exports.__esModule = true;
exports.paths = void 0;
var path_1 = require("path");
/**
 * Current working dir.
 */
var projectDir = process.cwd();
/**
 * Bud framework dir.
 */
var frameworkDir = path_1.resolve(__dirname, './../../../');
/**
 * Path references.
 */
var paths = {
    project: projectDir,
    framework: frameworkDir,
    src: path_1.join(projectDir, ''),
    dist: path_1.join(projectDir, ''),
    public: ''
};
exports.paths = paths;
//# sourceMappingURL=paths.js.map