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
exports.Debug = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var prop_types_1 = __importDefault(require("prop-types"));
var cli_highlight_1 = __importDefault(require("cli-highlight"));
var Debug = function (_a) {
    var _b;
    var actions = _a.actions, config = _a.config;
    var isFocused = ink_1.useFocus({ autoFocus: false }).isFocused;
    react_1.useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ debug: isFocused });
    }, [isFocused]);
    return (<ink_1.Box display={isFocused && ((_b = config === null || config === void 0 ? void 0 : config.features) === null || _b === void 0 ? void 0 : _b.debug)
        ? 'flex'
        : 'none'} flexDirection="column">
      <ink_1.Text>
        {cli_highlight_1["default"](JSON.stringify({ config: config }, null, 4))}
      </ink_1.Text>
    </ink_1.Box>);
};
exports.Debug = Debug;
Debug.propTypes = {
    actions: prop_types_1["default"].object,
    config: prop_types_1["default"].object
};
