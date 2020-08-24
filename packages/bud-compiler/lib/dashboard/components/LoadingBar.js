"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Bar = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var ink_use_stdout_dimensions_1 = __importDefault(require("ink-use-stdout-dimensions"));
var Bar = function (_a) {
    var _b = _a.color, color = _b === void 0 ? 'green' : _b, _c = _a.backgroundColor, backgroundColor = _c === void 0 ? 'white' : _c, percent = _a.percent, _d = _a.character, character = _d === void 0 ? '█' : _d, columns = _a.columns;
    var width = ink_use_stdout_dimensions_1["default"]()[0];
    var getString = function () {
        var screen = columns || width - 8;
        var max = Math.min(Math.floor(screen * percent), screen);
        var chars = character.repeat(max);
        return chars + ' '.repeat(screen - max);
    };
    return (react_1["default"].createElement(ink_1.Text, { backgroundColor: backgroundColor, color: color }, getString()));
};
exports.Bar = Bar;
//# sourceMappingURL=LoadingBar.js.map