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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.Errors = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var Error_1 = require("./Error");
var Errors = function (_a) {
    var _b;
    var build = _a.build, actions = _a.actions;
    var isFocused = ink_1.useFocus({ autoFocus: true }).isFocused;
    react_1.useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ errors: isFocused });
    }, [isFocused]);
    var _c = react_1.useState(null), display = _c[0], setDisplay = _c[1];
    react_1.useEffect(function () {
        setDisplay(isFocused);
    }, [isFocused, build === null || build === void 0 ? void 0 : build.errors]);
    return (react_1["default"].createElement(ink_1.Box, { display: display ? 'flex' : 'none', flexDirection: "column" },
        (build === null || build === void 0 ? void 0 : build.errors) &&
            build.errors.length > 0 &&
            build.errors.map(function (err, i) { return react_1["default"].createElement(Error_1.Error, { message: err, key: i }); }),
        ((_b = build === null || build === void 0 ? void 0 : build.warnings) === null || _b === void 0 ? void 0 : _b.length) == 0 && (react_1["default"].createElement(ink_1.Text, null, "Nothing to see here."))));
};
exports.Errors = Errors;
//# sourceMappingURL=index.js.map