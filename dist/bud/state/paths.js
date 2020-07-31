"use strict";
exports.__esModule = true;
exports.pathsRepository = void 0;
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
var pathsRepository = {
    project: project,
    framework: framework,
    src: project,
    dist: project,
    public: '/'
};
exports.pathsRepository = pathsRepository;
//# sourceMappingURL=paths.js.map