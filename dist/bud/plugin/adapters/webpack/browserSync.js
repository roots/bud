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
exports.browserSync = void 0;
var browser_sync_webpack_plugin_1 = __importDefault(require("browser-sync-webpack-plugin"));
/**
 * BrowserSync plugin adapter.
 */
var browserSync = function () { return ({
    mergeOptions: function () {
        return this.bud.state.options.browserSync;
    },
    make: function () {
        if (this.bud.state.features.hot) {
            this.options = __assign({}, this.options);
        }
        return new browser_sync_webpack_plugin_1["default"](this.options);
    },
    when: function () {
        return this.bud.state.features.browserSync
            && !this.bud.state.features.hot;
    }
}); };
exports.browserSync = browserSync;
//# sourceMappingURL=browserSync.js.map