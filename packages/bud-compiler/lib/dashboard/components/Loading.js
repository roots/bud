"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Loading = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var LoadingBar_1 = require("./LoadingBar");
/**
 * Loading (Progress Plugin)
 */
var Loading = function (_a) {
    var _b;
    var build = _a.build;
    return (build === null || build === void 0 ? void 0 : build.percentage) > 0 ? (react_1["default"].createElement(ink_1.Box, { flexDirection: "row" },
        react_1["default"].createElement(ink_1.Box, { width: 6 },
            react_1["default"].createElement(ink_1.Text, { wrap: "truncate" },
                Math.round((build === null || build === void 0 ? void 0 : build.percentage) * 100),
                "%",
                (build === null || build === void 0 ? void 0 : build.percentage) < 1 ? '  ' : ' ')),
        react_1["default"].createElement(LoadingBar_1.Bar, { backgroundColor: "#171c56", color: '#545DD7', character: "\u2588", percent: (_b = build === null || build === void 0 ? void 0 : build.percentage) !== null && _b !== void 0 ? _b : 0.01 }))) : (react_1["default"].createElement(ink_1.Box, null));
};
exports.Loading = Loading;
//# sourceMappingURL=Loading.js.map