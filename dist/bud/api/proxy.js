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
exports.__esModule = true;
exports.proxy = void 0;
var proxy = function (_a) {
    var host = _a.host, _b = _a.ssl, ssl = _b === void 0 ? false : _b;
    var qualified = ssl ? "https://" + host : "http://" + host;
    this.state.options.dev = __assign(__assign({}, this.state.options.dev), { host: host, proxy: __assign(__assign({}, this.state.options.dev.proxy), { target: qualified, headers: __assign(__assign({}, this.state.options.dev.proxy.headers), { 'X-Bud-Proxy': qualified }) }) });
    this.state.options.browserSync = __assign(__assign({}, this.state.options.browserSync), { proxy: __assign(__assign({}, this.state.options.browserSync.proxy), { target: qualified, ws: true, proxyReq: [
                function (proxyReq) {
                    proxyReq.setHeader('X-Bud-Proxy', host);
                }
            ] }) });
    return this;
};
exports.proxy = proxy;
//# sourceMappingURL=proxy.js.map