"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Nav = void 0;
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
/**
 * List item indicator
 * @prop {boolean} active
 */
var Bullet = function (_a) {
    var active = _a.active;
    return react_1["default"].createElement(ink_1.Text, null, active ? '◉' : ' ');
};
Bullet.propTypes = {
    active: prop_types_1["default"].bool
};
/**
 * Nav
 *
 * @prop {object} build
 * @prop {boolean} focused
 * @prop {object} bud
 */
var Nav = function (_a) {
    var _b, _c, _d, _e;
    var build = _a.build, focused = _a.focused, bud = _a.bud;
    return (react_1["default"].createElement(ink_1.Box, { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
        react_1["default"].createElement(ink_1.Box, null,
            react_1["default"].createElement(ink_1.Text, { color: '#545DD7' }, "@roots/bud")),
        react_1["default"].createElement(ink_1.Spacer, null),
        react_1["default"].createElement(ink_1.Spacer, null),
        react_1["default"].createElement(ink_1.Spacer, null),
        react_1["default"].createElement(ink_1.Box, null,
            react_1["default"].createElement(ink_1.Text, { color: (focused === null || focused === void 0 ? void 0 : focused.assets) ? 'white' : '#6C758F' },
                react_1["default"].createElement(Bullet, { active: focused === null || focused === void 0 ? void 0 : focused.assets }),
                " Assets")),
        react_1["default"].createElement(ink_1.Spacer, null),
        react_1["default"].createElement(ink_1.Box, null,
            react_1["default"].createElement(ink_1.Text, { color: ((_b = build === null || build === void 0 ? void 0 : build.errors) === null || _b === void 0 ? void 0 : _b.length) > 0
                    ? '#dc3545'
                    : (focused === null || focused === void 0 ? void 0 : focused.errors) ? 'white'
                        : '#6C758F' },
                react_1["default"].createElement(Bullet, { active: (focused === null || focused === void 0 ? void 0 : focused.errors) || false }),
                " Errors",
                ((_c = build === null || build === void 0 ? void 0 : build.errors) === null || _c === void 0 ? void 0 : _c.length) > 0 && build.errors[0]
                    ? " [" + build.errors.length + "]"
                    : "  ")),
        react_1["default"].createElement(ink_1.Spacer, null),
        react_1["default"].createElement(ink_1.Box, null,
            react_1["default"].createElement(ink_1.Text, { color: ((_d = build === null || build === void 0 ? void 0 : build.warnings) === null || _d === void 0 ? void 0 : _d.length) > 0
                    ? '#fd7e14'
                    : (focused === null || focused === void 0 ? void 0 : focused.warnings) ? 'white'
                        : '#6C758F' },
                react_1["default"].createElement(Bullet, { active: (focused === null || focused === void 0 ? void 0 : focused.warnings) || false }),
                " Warnings",
                ((_e = build === null || build === void 0 ? void 0 : build.warnings) === null || _e === void 0 ? void 0 : _e.length) > 0
                    ? " [" + (build === null || build === void 0 ? void 0 : build.warnings.length) + "]"
                    : "  ")),
        bud.features.enabled('hot') && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(ink_1.Spacer, null),
            react_1["default"].createElement(ink_1.Box, null,
                react_1["default"].createElement(ink_1.Text, { color: (focused === null || focused === void 0 ? void 0 : focused.devServer) ? 'white' : '#6C758F' },
                    react_1["default"].createElement(Bullet, { active: focused === null || focused === void 0 ? void 0 : focused.devServer }),
                    " Dev server")))),
        bud.features.enabled('browserSync') && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(ink_1.Spacer, null),
            react_1["default"].createElement(ink_1.Box, null,
                react_1["default"].createElement(ink_1.Text, { color: (focused === null || focused === void 0 ? void 0 : focused.browserSync) ? 'white' : '#6C758F' },
                    react_1["default"].createElement(Bullet, { active: focused === null || focused === void 0 ? void 0 : focused.browserSync }),
                    " BrowserSync")))),
        bud.features.enabled('debug') && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(ink_1.Spacer, null),
            react_1["default"].createElement(ink_1.Box, null,
                react_1["default"].createElement(ink_1.Text, { color: (focused === null || focused === void 0 ? void 0 : focused.debug) ? '#ffc107' : '#ffe598' },
                    react_1["default"].createElement(Bullet, { active: (focused === null || focused === void 0 ? void 0 : focused.debug) || false }),
                    " Debug"))))));
};
exports.Nav = Nav;
Nav.propTypes = {
    build: prop_types_1["default"].object,
    focused: prop_types_1["default"].object,
    bud: prop_types_1["default"].object
};
//# sourceMappingURL=Nav.js.map