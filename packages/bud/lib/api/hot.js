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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.hot = void 0;
var chokidar_1 = __importDefault(require("chokidar"));
var hot = function (options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    this.features.set('hot', (_a = options === null || options === void 0 ? void 0 : options.enabled) !== null && _a !== void 0 ? _a : this.inDevelopment);
    (options === null || options === void 0 ? void 0 : options.watch) &&
        this.options.set('webpack.watch', __spreadArrays(this.options.get('webpack.watch'), options.watch));
    var devServer = this.options.has('devServer')
        ? this.options.get('webpack.devServer')
        : {};
    var proxyAll = devServer.proxy && devServer.proxy['**']
        ? devServer.proxy['**']
        : {};
    var chokidarHandler = (_b = options === null || options === void 0 ? void 0 : options.chokidar) !== null && _b !== void 0 ? _b : {
        before: function (app, server) {
            var _a;
            chokidar_1["default"].watch((_a = options === null || options === void 0 ? void 0 : options.watch) !== null && _a !== void 0 ? _a : []).on('all', function () {
                server.sockWrite(server.sockets, 'content-changed');
            });
        }
    };
    this.options.set('devServer', this.hooks.filter('api.hot', __assign(__assign(__assign({}, devServer), chokidarHandler), { hot: (_d = (_c = options === null || options === void 0 ? void 0 : options.enabled) !== null && _c !== void 0 ? _c : devServer.enabled) !== null && _d !== void 0 ? _d : true, host: (_f = (_e = options === null || options === void 0 ? void 0 : options.host) !== null && _e !== void 0 ? _e : devServer.host) !== null && _f !== void 0 ? _f : 'localhost', overlay: (_h = (_g = options === null || options === void 0 ? void 0 : options.overlay) !== null && _g !== void 0 ? _g : devServer.overlay) !== null && _h !== void 0 ? _h : true, port: (_k = (_j = options === null || options === void 0 ? void 0 : options.port) !== null && _j !== void 0 ? _j : devServer.port) !== null && _k !== void 0 ? _k : 3000, secure: (_m = (_l = options === null || options === void 0 ? void 0 : options.secure) !== null && _l !== void 0 ? _l : devServer.secure) !== null && _m !== void 0 ? _m : false, open: (_p = (_o = options === null || options === void 0 ? void 0 : options.open) !== null && _o !== void 0 ? _o : devServer.open) !== null && _p !== void 0 ? _p : true, historyApiFallback: (_r = (_q = options === null || options === void 0 ? void 0 : options.historyApiFallback) !== null && _q !== void 0 ? _q : devServer.historyApiFallback) !== null && _r !== void 0 ? _r : true, headers: __assign(__assign({}, ((_s = this.options.get('webpack.devServer.headers')) !== null && _s !== void 0 ? _s : [])), ((_t = options === null || options === void 0 ? void 0 : options.headers) !== null && _t !== void 0 ? _t : [])), proxy: __assign(__assign(__assign({}, ((_u = devServer.proxy) !== null && _u !== void 0 ? _u : [])), { '**': __assign(__assign({}, (proxyAll !== null && proxyAll !== void 0 ? proxyAll : [])), { target: (_w = (_v = options === null || options === void 0 ? void 0 : options.host) !== null && _v !== void 0 ? _v : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.target) !== null && _w !== void 0 ? _w : 'http://localhost', secure: (_y = (_x = options === null || options === void 0 ? void 0 : options.secure) !== null && _x !== void 0 ? _x : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.secure) !== null && _y !== void 0 ? _y : devServer.secure, changeOrigin: (_0 = (_z = options === null || options === void 0 ? void 0 : options.changeOrigin) !== null && _z !== void 0 ? _z : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.changeOrigin) !== null && _0 !== void 0 ? _0 : true, port: (_2 = (_1 = options === null || options === void 0 ? void 0 : options.port) !== null && _1 !== void 0 ? _1 : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.port) !== null && _2 !== void 0 ? _2 : devServer.port, headers: __assign(__assign({}, this.options.get('webpack.devServer.proxy.headers')), ((_4 = (_3 = options === null || options === void 0 ? void 0 : options.headers) !== null && _3 !== void 0 ? _3 : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.headers) !== null && _4 !== void 0 ? _4 : [])) }) }), ((_5 = options === null || options === void 0 ? void 0 : options.proxy) !== null && _5 !== void 0 ? _5 : [])) })));
    return this;
};
exports.hot = hot;
//# sourceMappingURL=hot.js.map