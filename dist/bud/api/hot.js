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
exports.hot = void 0;
var chokidar_1 = __importDefault(require("chokidar"));
/**
 * ## bud.hot
 *
 * Enable or disable hot module reloading
 *
 * ```js
 * bud.hot(true) // enable HMR
 * ```
 */
var hot = function (options) {
    var _a, _b;
    this.state.features.hot = (_a = options.enabled) !== null && _a !== void 0 ? _a : true;
    if (this.state.features.hot) {
        this.state.options.dev = __assign(__assign({}, this.state.options.dev), { before: function (app, server) {
                var _a;
                chokidar_1["default"].watch((_a = options.watch) !== null && _a !== void 0 ? _a : []).on('all', function () {
                    server.sockWrite(server.sockets, 'content-changed');
                });
            }, proxy: __assign(__assign({}, this.state.options.dev.proxy), { '**': {
                    target: options.target,
                    secure: false,
                    changeOrigin: true,
                    port: (_b = options.port) !== null && _b !== void 0 ? _b : 3020
                } }), headers: __assign(__assign({}, this.state.options.dev.headers), { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS', 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization' }), hot: true, overlay: true, historyApiFallback: true, open: true });
    }
    return this;
};
exports.hot = hot;
//# sourceMappingURL=hot.js.map