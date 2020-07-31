"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.env = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var container_1 = require("../container");
var path_1 = require("path");
/**
 * Environment variables container.
 */
var env = function (state) {
    return new container_1.container(dotenv_1["default"].config({
        path: path_1.join(state.paths.get('project'), '.env')
    }).parsed);
};
exports.env = env;
//# sourceMappingURL=env.js.map