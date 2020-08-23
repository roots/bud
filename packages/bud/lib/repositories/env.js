"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
exports.env = void 0;
var path_1 = require("path");
var dotenv_1 = __importDefault(require("dotenv"));
var env = {
    name: 'env',
    register: (_a = dotenv_1["default"].config({
        path: path_1.join(process.cwd(), '.env')
    }).parsed) !== null && _a !== void 0 ? _a : {}
};
exports.env = env;
//# sourceMappingURL=env.js.map