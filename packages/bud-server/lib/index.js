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
var express_1 = __importDefault(require("express"));
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var injectEntrypoints_1 = __importDefault(require("./injectEntrypoints"));
var createDomain_1 = __importDefault(require("./createDomain"));
var app = express_1["default"]();
var server = function (bud) {
    var config = bud.options.get('webpack');
    var domain = createDomain_1["default"](bud.options.get('webpack.devServer'), app);
    bud.options.set('webpack.entry', injectEntrypoints_1["default"](domain, config));
    bud.apply('compiler', webpack_1["default"](bud.config(bud)));
    app.use(webpack_dev_middleware_1["default"](bud.compiler, makeDevOptions(bud, config.devServer)));
    app.use(webpack_hot_middleware_1["default"](bud.compiler, makeHotOptions()));
    config.devServer.proxy &&
        app.use('**', http_proxy_middleware_1.createProxyMiddleware(makeProxyOptions(config.devServer)));
    app.listen(config.devServer.port, config.devServer.host);
    bud.compiler.hooks.afterEmit.tap('bud', function () {
        bud.fs.outputFile(bud.dist('hot'), domain);
    });
    return app;
};
exports["default"] = server;
var poweredBy = {
    'X-Powered-By': '@roots/bud'
};
var makeDevOptions = function (bud, options) { return ({
    filename: options.filename || 'index.html',
    headers: __assign(__assign({}, options.headers), poweredBy) || poweredBy,
    lazy: options.lazy || false,
    logger: options.logger || bud.logger,
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
var makeHotOptions = function () { return ({
    path: '/__webpack_hmr',
    heartbeat: 2000
}); };
var makeProxyOptions = function (config) {
    var _a;
    return ({
        target: config.proxy.target,
        autoRewrite: config.proxy.autoRewrite || true,
        changeOrigin: config.proxy.changeOrigin || true,
        ws: config.proxy.ws || true,
        router: (_a = {},
            _a[(config.proxy.target || 'localhost') + ":3000"] = config.proxy.host + ":" + (config.proxy.port || 8000),
            _a)
    });
};
//# sourceMappingURL=index.js.map