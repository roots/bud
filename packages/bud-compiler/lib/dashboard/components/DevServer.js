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
exports.__esModule = true;
exports.DevServer = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var prettier_1 = require("prettier");
var DevServer = function (_a) {
    var build = _a.build, actions = _a.actions, bud = _a.bud;
    var isFocused = ink_1.useFocus({ autoFocus: false }).isFocused;
    react_1.useEffect(function () {
        actions === null || actions === void 0 ? void 0 : actions.setFocus({ devServer: isFocused });
    }, [isFocused]);
    return (react_1["default"].createElement(ink_1.Box, { display: isFocused ? 'flex' : 'none', flexDirection: "column" },
        react_1["default"].createElement(ink_1.Box, { paddingLeft: 1, paddingRight: 1, flexDirection: "column" },
            react_1["default"].createElement(ink_1.Text, { color: 'green' }, "Server"),
            react_1["default"].createElement(ink_1.Text, { wrap: "wrap" }, prettier_1.format(JSON.stringify(build === null || build === void 0 ? void 0 : build.client), { parser: 'json' }) || ''))));
};
exports.DevServer = DevServer;
//# sourceMappingURL=DevServer.js.map