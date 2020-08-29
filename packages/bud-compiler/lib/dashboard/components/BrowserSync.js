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
exports.BrowserSync = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
var patch_console_1 = __importDefault(require("patch-console"));
/**
 * BrowserSync info
 *
 * @prop {object} actions
 * @return {PropTypes.ReactComponentLike}
 */
var BrowserSync = function (_a) {
    var actions = _a.actions;
    var isFocused = ink_1.useFocus({ autoFocus: false }).isFocused;
    react_1.useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ browserSync: isFocused });
    }, [isFocused]);
    /**
     * Capture BrowserSync console out using `patch-console`. This
     * pkg allows for inserting the console.out into a specific place
     * in the component. Left alone the stdout/stderr and the React CLI
     * will conflict.
     *
     * Additionally, compare the last rendered text with the new render.
     * If they are identical it's likely the BrowserSync watching message.
     * Discard it if they are a match so we don't just repeat that message
     * ad nauseum.
     */
    var _b = react_1.useState(null), lastConsole = _b[0], setLastConsole = _b[1];
    var _c = react_1.useState(''), consoleOut = _c[0], setConsoleOut = _c[1];
    patch_console_1["default"](function (stream, data) {
        setLastConsole(data);
        var frameOut = lastConsole !== data ? consoleOut + data : consoleOut;
        setConsoleOut(frameOut);
    });
    return (react_1["default"].createElement(ink_1.Box, { display: isFocused ? 'flex' : 'none', flexDirection: "column" },
        react_1["default"].createElement(ink_1.Text, null, consoleOut)));
};
exports.BrowserSync = BrowserSync;
BrowserSync.propTypes = {
    actions: prop_types_1["default"].object
};
//# sourceMappingURL=BrowserSync.js.map