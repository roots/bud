"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.env = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var env = function (framework) {
    var _a;
    return (_a = dotenv_1["default"].config({
        path: framework.fs.path.join(framework.paths.get('project'), '.env')
    }).parsed) !== null && _a !== void 0 ? _a : {};
};
exports.env = env;
//# sourceMappingURL=env.js.map