"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var http_proxy_middleware_1 = require("http-proxy-middleware");
var routes = function (bud) {
    var _a;
    var target = {
        host: bud.options.get('webpack.devServer.proxy.target') ||
            bud.options.get('webpack.devServer.target'),
        port: bud.options.get('webpack.devServer.proxy.port') || 3000
    };
    var host = bud.options.get('webpack.devServer.host') || 'localhost';
    var port = bud.options.get('webpack.devServer.port') || 8000;
    return _a = {},
        _a[host + ":" + port] = target.host + ":" + target.port,
        _a;
};
var proxy = function (bud) {
    return http_proxy_middleware_1.createProxyMiddleware({
        target: bud.options.get("webpack.devServer.target"),
        autoRewrite: bud.options.get('webpack.devServer.autoRewrite') || true,
        changeOrigin: bud.options.get('webpack.devServer.changeOrigin') || true,
        ws: bud.options.get('webpack.devServer.ws') || true,
        router: routes(bud)
    });
};
exports["default"] = proxy;
//# sourceMappingURL=proxy.js.map