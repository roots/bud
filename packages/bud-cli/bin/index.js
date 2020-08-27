"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var ink_use_stdout_dimensions_1 = __importDefault(require("ink-use-stdout-dimensions"));
/**
 * Bud-CLI
 */
var App = function (props) {
    var _a = ink_use_stdout_dimensions_1["default"](), width = _a[0], height = _a[1];
    var dimensions = {
        width: width,
        height: height - 5
    };
    return (react_1["default"].createElement(ink_1.Box, { width: dimensions.width, minHeight: dimensions.height, paddingRight: 1, paddingBottom: 1, paddingTop: 1, flexDirection: "column" },
        react_1["default"].createElement(ink_1.Box, { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
            react_1["default"].createElement(ink_1.Box, null,
                react_1["default"].createElement(ink_1.Text, { color: '#545DD7' }, "@roots/bud-scripts"),
                react_1["default"].createElement(ink_1.Text, null, "Triggered")))));
};
/** 🚀 */
ink_1.render(react_1["default"].createElement(App, null));
//# sourceMappingURL=index.js.map