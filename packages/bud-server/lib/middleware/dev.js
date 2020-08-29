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
exports["default"] = void 0;
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var dev = function (bud) {
    return webpack_dev_middleware_1["default"](bud.compiler, options(bud.options.get('webpack.devServer')));
};
exports["default"] = dev;
var PROXY_MSG = {
    'X-Proxied-By': '@roots/bud'
};
var options = function (options) { return ({
    filename: options.filename || 'index.html',
    headers: __assign(__assign({}, options.headers), PROXY_MSG) || PROXY_MSG,
    lazy: options.lazy || false,
    logLevel: options.logLevel || 'info',
    logTime: options.logTime || true,
    methods: options.methods || ['GET', 'HEAD'],
    mimeTypes: options.mimeTypes || null,
    publicPath: options.publicPath,
    serverSideRender: options.serverSideRender || false,
    stats: options.stats || false,
    watchOptions: options.watchOptions || {
        aggregateTimeout: 300,
        poll: true
    },
    writeToDisk: options.writeToDisk || false
}); };
//# sourceMappingURL=dev.js.map