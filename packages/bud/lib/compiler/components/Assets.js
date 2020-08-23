"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Assets = void 0;
var react_1 = __importStar(require("react"));
var ink_1 = require("ink");
var Indicator = function (_a) {
    var emitted = _a.emitted;
    return (react_1["default"].createElement(ink_1.Text, { color: emitted ? '#545DD7' : '#6C758F' }, "\u29BF "));
};
var Asset = function (_a) {
    var asset = _a.asset;
    var display = asset.name.split('.').pop() == 'css' ||
        asset.name.split('.').pop() == 'js';
    return !display ? (react_1["default"].createElement(ink_1.Box, null)) : (react_1["default"].createElement(ink_1.Box, { flexDirection: "row", justifyContent: "space-between" },
        react_1["default"].createElement(ink_1.Box, null,
            react_1["default"].createElement(Indicator, { emitted: asset.emitted }),
            react_1["default"].createElement(ink_1.Text, { color: asset.emitted ? 'white' : 'gray' }, asset.name)),
        react_1["default"].createElement(ink_1.Spacer, null),
        react_1["default"].createElement(ink_1.Box, null,
            react_1["default"].createElement(ink_1.Text, { dimColor: true },
                asset.size / 1000,
                "kb"))));
};
var Assets = function (_a) {
    var _b, _c;
    var build = _a.build, actions = _a.actions;
    var isFocused = ink_1.useFocus({ autoFocus: true }).isFocused;
    react_1.useEffect(function () {
        actions.setFocus({ assets: isFocused });
    }, [isFocused]);
    return (react_1["default"].createElement(ink_1.Box, { display: isFocused ? 'flex' : 'none', flexDirection: "column" }, (_b = build === null || build === void 0 ? void 0 : build.assets) === null || _b === void 0 ? void 0 :
        _b.map(function (asset, id) { return (react_1["default"].createElement(Asset, __assign({ key: id }, asset))); }),
        ((_c = build === null || build === void 0 ? void 0 : build.assets) === null || _c === void 0 ? void 0 : _c.length) == 0 && react_1["default"].createElement(ink_1.Text, null, "Loading")));
};
exports.Assets = Assets;
//# sourceMappingURL=Assets.js.map