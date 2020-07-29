"use strict";
exports.__esModule = true;
exports.paths = void 0;
var path_1 = require("path");
var projectRoot_1 = require("../util/projectRoot");
/**
 * Current working dir.
 */
var project = projectRoot_1.projectRoot;
/**
 * Bud framework dir.
 */
var framework = path_1.resolve(__dirname, '../../../');
/**
 * Path references.
 */
var paths = {
    project: project,
    framework: framework,
    src: project,
    dist: project,
    public: ''
};
exports.paths = paths;
//# sourceMappingURL=paths.js.map