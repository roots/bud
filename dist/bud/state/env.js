"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.env = void 0;
var path_1 = require("path");
var dotenv_1 = __importDefault(require("dotenv"));
var paths_1 = require("./paths");
/**
 * Environment variables container.
 */
var env = dotenv_1["default"].config({
    path: path_1.join(paths_1.paths.project, '.env')
}).parsed;
exports.env = env;
//# sourceMappingURL=env.js.map