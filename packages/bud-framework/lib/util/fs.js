"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fs = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = __importDefault(require("path"));
var fs = {
    path: path_1["default"],
    existsSync: fs_extra_1.existsSync
};
exports.fs = fs;
//# sourceMappingURL=fs.js.map