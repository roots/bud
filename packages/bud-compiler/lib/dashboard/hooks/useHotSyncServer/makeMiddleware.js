"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.makeMiddleware = void 0;
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
var makeMiddleware = function (bud, setDevStats) {
    var devMiddlewareOptions = {
        headers: bud.options.get('devServer.headers'),
        logger: bud.logger,
        loglevel: 'trace',
        publicPath: bud.paths.get('public'),
        writeToDisk: false,
        reload: false,
        reporter: function (middlewareOptions, reporterOptions) {
            (reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.stats) &&
                setDevStats(reporterOptions.stats.toJson({
                    version: true,
                    hash: true,
                    time: true,
                    assets: true,
                    errors: true,
                    warnings: true,
                    chunks: false,
                    modules: false,
                    entrypoints: false,
                    assetsByChunkName: false,
                    logging: false,
                    children: false,
                    namedChunkGroups: false
                }));
        }
    };
    bud.logger.info({
        name: 'bud.compiler',
        devMiddlewareOptions: devMiddlewareOptions
    }, 'dev server middleware options');
    var devMiddleware = webpack_dev_middleware_1["default"](bud.compiler, {
        headers: bud.options.get('devServer.headers'),
        logger: bud.logger,
        publicPath: bud.paths.get('public'),
        writeToDisk: false,
        reporter: function (middlewareOptions, reporterOptions) {
            (reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.stats) &&
                setDevStats(reporterOptions.stats.toJson({
                    version: true,
                    hash: true,
                    assets: true,
                    errors: true,
                    warnings: true,
                    chunks: false,
                    modules: false,
                    entrypoints: false,
                    children: false
                }));
        }
    });
    var hotMiddleware = webpack_hot_middleware_1["default"](bud.compiler, {
        heartbeat: 2000
    });
    return [devMiddleware, hotMiddleware];
};
exports.makeMiddleware = makeMiddleware;
//# sourceMappingURL=makeMiddleware.js.map