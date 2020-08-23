"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Bar = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var Bar = function (_a) {
    var percent = _a.percent, _b = _a.character, character = _b === void 0 ? '█' : _b, columns = _a.columns, left = _a.left, right = _a.right, rightPad = _a.rightPad;
    var getString = function () {
        var screen = columns || process.stdout.columns || 80;
        var space = screen - right - left;
        var max = Math.min(Math.floor(space * percent), space);
        var chars = character.repeat(max);
        if (!rightPad) {
            return chars;
        }
        return chars + ' '.repeat(space - max);
    };
    return react_1["default"].createElement(ink_1.Text, null, getString());
};
exports.Bar = Bar;
//# sourceMappingURL=LoadingBar.js.map