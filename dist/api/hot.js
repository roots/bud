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
import chokidar from 'chokidar';
var hot = function (options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    this.logger.info({
        name: 'bud.api',
        "function": 'bud.hot',
        options: options
    }, 'api.hot called');
    if ((options === null || options === void 0 ? void 0 : options.enabled) === false) {
        this.logger.info({
            name: 'bud.api',
            "function": 'bud.hot',
            enabled: options.enabled
        }, "api.hot is not applicable to this build. skipping.");
        return this;
    }
    if (options === null || options === void 0 ? void 0 : options.watch) {
        this.options.set('watch', __spreadArrays(this.options.get('watch'), options.watch));
    }
    this.features.enable('hot');
    var dev = this.options.has('dev') ? this.options.get('dev') : {};
    var proxyAll = dev.proxy && dev.proxy['**'] ? dev.proxy['**'] : {};
    var chokidarHandler = (_a = options === null || options === void 0 ? void 0 : options.chokidar) !== null && _a !== void 0 ? _a : {
        before: function (app, server) {
            var _a;
            chokidar.watch((_a = options === null || options === void 0 ? void 0 : options.watch) !== null && _a !== void 0 ? _a : []).on('all', function () {
                server.sockWrite(server.sockets, 'content-changed');
            });
        }
    };
    var devServerConfig = __assign(__assign(__assign({}, dev), chokidarHandler), { hot: (_c = (_b = options === null || options === void 0 ? void 0 : options.enabled) !== null && _b !== void 0 ? _b : dev.enabled) !== null && _c !== void 0 ? _c : true, host: (_e = (_d = options === null || options === void 0 ? void 0 : options.host) !== null && _d !== void 0 ? _d : dev.host) !== null && _e !== void 0 ? _e : 'localhost', overlay: (_g = (_f = options === null || options === void 0 ? void 0 : options.overlay) !== null && _f !== void 0 ? _f : dev.overlay) !== null && _g !== void 0 ? _g : true, port: (_j = (_h = options === null || options === void 0 ? void 0 : options.port) !== null && _h !== void 0 ? _h : dev.port) !== null && _j !== void 0 ? _j : 3000, secure: (_l = (_k = options === null || options === void 0 ? void 0 : options.secure) !== null && _k !== void 0 ? _k : dev.secure) !== null && _l !== void 0 ? _l : false, open: (_o = (_m = options === null || options === void 0 ? void 0 : options.open) !== null && _m !== void 0 ? _m : dev.open) !== null && _o !== void 0 ? _o : true, historyApiFallback: (_q = (_p = options === null || options === void 0 ? void 0 : options.historyApiFallback) !== null && _p !== void 0 ? _p : dev.historyApiFallback) !== null && _q !== void 0 ? _q : true, headers: __assign(__assign({}, ((_r = this.options.get('headers')) !== null && _r !== void 0 ? _r : [])), ((_s = options === null || options === void 0 ? void 0 : options.headers) !== null && _s !== void 0 ? _s : [])), proxy: __assign(__assign(__assign({}, ((_t = dev.proxy) !== null && _t !== void 0 ? _t : [])), { '**': __assign(__assign({}, (proxyAll !== null && proxyAll !== void 0 ? proxyAll : [])), { target: (_v = (_u = options === null || options === void 0 ? void 0 : options.host) !== null && _u !== void 0 ? _u : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.target) !== null && _v !== void 0 ? _v : 'http://localhost', secure: (_x = (_w = options === null || options === void 0 ? void 0 : options.secure) !== null && _w !== void 0 ? _w : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.secure) !== null && _x !== void 0 ? _x : dev.secure, changeOrigin: (_z = (_y = options === null || options === void 0 ? void 0 : options.changeOrigin) !== null && _y !== void 0 ? _y : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.changeOrigin) !== null && _z !== void 0 ? _z : true, port: (_1 = (_0 = options === null || options === void 0 ? void 0 : options.port) !== null && _0 !== void 0 ? _0 : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.port) !== null && _1 !== void 0 ? _1 : dev.port, headers: (_4 = (_3 = (_2 = options === null || options === void 0 ? void 0 : options.headers) !== null && _2 !== void 0 ? _2 : proxyAll === null || proxyAll === void 0 ? void 0 : proxyAll.headers) !== null && _3 !== void 0 ? _3 : this.options.get('headers')) !== null && _4 !== void 0 ? _4 : [] }) }), ((_5 = options === null || options === void 0 ? void 0 : options.proxy) !== null && _5 !== void 0 ? _5 : [])) });
    this.logger.info({
        name: 'bud.api',
        "function": 'bud.hot',
        devServerConfig: devServerConfig
    }, 'Updating dev server configuration');
    this.options.set('dev', devServerConfig);
    return this;
};
export { hot };
//# sourceMappingURL=hot.js.map