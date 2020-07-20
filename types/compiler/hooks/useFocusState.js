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
var use_global_hook_1 = __importDefault(require("use-global-hook"));
var useFocusState = use_global_hook_1["default"](react_1["default"], {
    assets: true,
    debug: false,
    errors: false,
    warnings: false
}, {
    setFocus: function (store, value) {
        store.setState(__assign(__assign({}, store.state), value));
    }
});
exports.useFocusState = useFocusState;
