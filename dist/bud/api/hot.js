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
var hot = function (options) {
    var _a, _b, _c, _d;
    this.features.set('hot', (_a = options.enabled) !== null && _a !== void 0 ? _a : true);
    if (this.features.enabled('hot')) {
        this.options.merge('dev', {
            before: function (app, server) {
                var _a;
                chokidar_1["default"].watch((_a = options.watch) !== null && _a !== void 0 ? _a : []).on('all', function () {
                    server.sockWrite(server.sockets, 'content-changed');
                });
            },
            host: (_b = options.host) !== null && _b !== void 0 ? _b : 'localhost',
            proxy: __assign(__assign({}, this.options.get('dev').proxy), { '**': {
                    target: options.host || 'localhost',
                    secure: options.secure || false,
                    changeOrigin: true,
                    port: (_c = options.port) !== null && _c !== void 0 ? _c : 3020
                } }),
            headers: __assign(__assign(__assign({}, this.options.get('dev').headers), { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS', 'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization' }), (options.headers || {})),
            hot: true,
            overlay: true,
            historyApiFallback: true,
            open: (_d = options.open) !== null && _d !== void 0 ? _d : false
        });
    }
    return this;
};
exports.hot = hot;
//# sourceMappingURL=hot.js.map