"use strict";
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
    app.use(webpack_dev_middleware_1["default"](bud.compiler, makeDevOptions(bud, domain, config.devServer)));
    app.use(webpack_hot_middleware_1["default"](bud.compiler, makeHotOptions(bud, domain, config.devServer)));
    if (config.devServer.proxy) {
        var proxyOptions = makeProxyOptions(bud, config.devServer);
        var proxyMiddleware = http_proxy_middleware_1.createProxyMiddleware(proxyOptions);
        app.use('**', proxyMiddleware);
    }
    app.listen(config.devServer.port, 'localhost');
    bud.compiler.hooks.afterEmit.tap('bud', function (compilation) {
        bud.fs.outputFile(bud.dist('hot'), domain);
    });
    return app;
};
exports["default"] = server;
var makeDevOptions = function (bud, domain, options) { return ({
    filename: options.filename || 'index.html',
    headers: options.headers || {},
    lazy: options.lazy || false,
    logger: options.logger || bud.logger,
    logLevel: options.logLevel || 'info',
    logTime: options.logTime || true,
    methods: options.methods || ['GET', 'HEAD'],
    mimeTypes: options.mimeTypes || null,
    publicPath: options.publicPath,
    serverSideRender: options.serverSideRender || false,
    stats: options.stats || false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    writeToDisk: options.writeToDisk || false
}); };
var makeHotOptions = function (bud, domain, options) { return ({
    path: '/__webpack_hmr',
    heartbeat: 2000
}); };
var makeProxyOptions = function (bud, options) {
    var _a;
    return ({
        target: options.proxy.target,
        autoRewrite: options.proxy.autoRewrite || true,
        changeOrigin: options.proxy.changeOrigin || true,
        ws: options.proxy.ws || true,
        router: (_a = {},
            _a[options.proxy.target + ":3000"] = options.host + ":8000",
            _a)
    });
};
//# sourceMappingURL=index.js.map