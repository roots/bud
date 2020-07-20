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
exports.Errors = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
var Error_1 = require("./Error");
/**
 * Error
 */
var Errors = function (_a) {
    var _b, _c, _d;
    var build = _a.build, actions = _a.actions;
    var isFocused = ink_1.useFocus({ autoFocus: true }).isFocused;
    react_1.useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ errors: isFocused });
    }, [isFocused]);
    var _e = react_1.useState(null), display = _e[0], setDisplay = _e[1];
    react_1.useEffect(function () {
        setDisplay(isFocused);
    }, [isFocused, build === null || build === void 0 ? void 0 : build.errors]);
    return (<ink_1.Box display={display ? 'flex' : 'none'} flexDirection="column">
      {((_b = build === null || build === void 0 ? void 0 : build.errors) === null || _b === void 0 ? void 0 : _b.length) > 0 && ((_c = build === null || build === void 0 ? void 0 : build.errors) === null || _c === void 0 ? void 0 : _c.map(function (err, i) { return (<Error_1.Error message={err} key={i}/>); }))}

      {((_d = build === null || build === void 0 ? void 0 : build.warnings) === null || _d === void 0 ? void 0 : _d.length) == 0 && (<ink_1.Text>Nothing to see here.</ink_1.Text>)}
    </ink_1.Box>);
};
exports.Errors = Errors;
Errors.propTypes = {
    build: prop_types_1["default"].object,
    actions: prop_types_1["default"].object
};
