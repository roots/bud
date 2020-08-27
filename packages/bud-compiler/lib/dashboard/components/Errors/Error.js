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
exports.Error = void 0;
var node_notifier_1 = __importDefault(require("node-notifier"));
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var Error = function (_a) {
    var message = _a.message;
    react_1.useEffect(function () {
        message &&
            node_notifier_1["default"].notify({
                title: 'Build error',
                message: message
            });
    }, [message]);
    return (react_1["default"].createElement(ink_1.Box, { paddingLeft: 1, paddingRight: 1, flexDirection: "column" },
        react_1["default"].createElement(ink_1.Text, { wrap: "wrap" }, message || '')));
};
exports.Error = Error;
//# sourceMappingURL=Error.js.map