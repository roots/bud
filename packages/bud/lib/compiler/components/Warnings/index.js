"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Warnings = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
var Warning_1 = require("./Warning");
/**
 * Warnings
 *
 * @prop {object} build
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
var Warnings = function (_a) {
    var _b, _c, _d;
    var build = _a.build, actions = _a.actions;
    var isFocused = ink_1.useFocus({ autoFocus: false }).isFocused;
    react_2.useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ warnings: isFocused });
    }, [isFocused]);
    var _e = react_2.useState(null), display = _e[0], setDisplay = _e[1];
    react_2.useEffect(function () {
        setDisplay(isFocused);
    }, [isFocused, build === null || build === void 0 ? void 0 : build.warnings]);
    return (react_1["default"].createElement(ink_1.Box, { display: display ? 'flex' : 'none', flexDirection: "column" },
        ((_b = build === null || build === void 0 ? void 0 : build.warnings) === null || _b === void 0 ? void 0 : _b.length) > 0 && ((_c = build === null || build === void 0 ? void 0 : build.warnings) === null || _c === void 0 ? void 0 : _c.map(function (warning, i) { return (react_1["default"].createElement(Warning_1.Warning, { message: warning, key: i })); })),
        ((_d = build === null || build === void 0 ? void 0 : build.warnings) === null || _d === void 0 ? void 0 : _d.length) == 0 && (react_1["default"].createElement(ink_1.Text, null, "Nothing to see here."))));
};
exports.Warnings = Warnings;
Warnings.propTypes = {
    build: prop_types_1["default"].object,
    actions: prop_types_1["default"].object
};
//# sourceMappingURL=index.js.map