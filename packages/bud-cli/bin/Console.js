"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports["default"] = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var patch_console_1 = __importDefault(require("patch-console"));
var Console = function () {
    var _a = react_1.useState(null), lastConsole = _a[0], setLastConsole = _a[1];
    var _b = react_1.useState(''), text = _b[0], setText = _b[1];
    patch_console_1["default"](function (stream, data) {
        setLastConsole(data);
        var frameOut = lastConsole !== data ? "" + text + data : text;
        setText(frameOut);
    });
    return react_1["default"].createElement(ink_1.Text, null, text !== null && text !== void 0 ? text : '');
};
exports["default"] = Console;
//# sourceMappingURL=Console.js.map