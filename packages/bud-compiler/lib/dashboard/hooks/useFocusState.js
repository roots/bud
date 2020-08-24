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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useFocusState = void 0;
var react_1 = __importDefault(require("react"));
var useStore_1 = __importDefault(require("./useStore"));
var setFocus = function (store, value) {
    store.setState(__assign(__assign({}, store.state), value));
};
var defaultState = {
    assets: true,
    debug: false,
    devServer: false,
    errors: false,
    warnings: false
};
var useFocusState = useStore_1["default"](react_1["default"], defaultState, {
    setFocus: setFocus
});
exports.useFocusState = useFocusState;
//# sourceMappingURL=useFocusState.js.map