"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BuildInfo = void 0;
/** Modules */
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
/** Application components */
var Loading_1 = require("./Loading");
/**
 * Build Info
 */
var BuildInfo = function (_a) {
    var build = _a.build, width = _a.width;
    return (react_1["default"].createElement(ink_1.Box, { flexDirection: "column", paddingTop: 1 },
        (build === null || build === void 0 ? void 0 : build.percentage) == 1 && (build === null || build === void 0 ? void 0 : build.hash) && (react_1["default"].createElement(ink_1.Text, { color: "#6C758F" },
            "Build ", build === null || build === void 0 ? void 0 :
            build.hash,
            ". Finished in ",
            (build === null || build === void 0 ? void 0 : build.time) / 1000,
            "s.")),
        react_1["default"].createElement(Loading_1.Loading, { build: build })));
};
exports.BuildInfo = BuildInfo;
BuildInfo.propTypes = {
    build: prop_types_1["default"].object,
    bud: prop_types_1["default"].object,
    width: prop_types_1["default"].number
};
//# sourceMappingURL=BuildInfo.js.map