"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports["default"] = void 0;
var dev_1 = __importDefault(require("./dev"));
var proxy_1 = __importDefault(require("./proxy"));
var hot_1 = __importDefault(require("./hot"));
var middleware = [dev_1["default"], hot_1["default"], proxy_1["default"]];
exports["default"] = middleware;
//# sourceMappingURL=index.js.map