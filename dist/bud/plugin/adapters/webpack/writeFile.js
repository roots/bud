"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.writeFile = void 0;
var write_file_webpack_plugin_1 = __importDefault(require("write-file-webpack-plugin"));
var writeFile = function () { return ({
    make: function () {
        return new write_file_webpack_plugin_1["default"]();
    },
    when: function () {
        return true;
    }
}); };
exports.writeFile = writeFile;
//# sourceMappingURL=writeFile.js.map