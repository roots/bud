"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var envRaw = dotenv_1["default"].config({
    path: path_1.join(paths_1.paths.project, '.env')
}).parsed;
var env = __assign({}, envRaw);
exports.env = env;
//# sourceMappingURL=env.js.map