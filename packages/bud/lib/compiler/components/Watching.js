"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Watching = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var ink_spinner_1 = __importDefault(require("ink-spinner"));
/**
 * Watch mode indicator
 * @prop {object} bud
 * @prop {object} build
 * @return {PropTypes.ReactElementLike}
 */
var Watching = function () { return (react_1["default"].createElement(ink_1.Box, { flexDirection: "row" },
    react_1["default"].createElement(ink_1.Text, { color: "#28a745" },
        react_1["default"].createElement(ink_1.Text, null,
            react_1["default"].createElement(ink_spinner_1["default"], { type: "dots" })),
        ' Watching'))); };
exports.Watching = Watching;
//# sourceMappingURL=Watching.js.map