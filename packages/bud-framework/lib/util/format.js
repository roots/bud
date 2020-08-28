"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.format = void 0;
var prettier_1 = __importDefault(require("prettier"));
var json = function (contents) {
    if (typeof contents == 'object') {
        contents = JSON.stringify(contents);
    }
    return prettier_1["default"].format(contents, { parser: 'json' });
};
var format = {
    json: json
};
exports.format = format;
//# sourceMappingURL=format.js.map