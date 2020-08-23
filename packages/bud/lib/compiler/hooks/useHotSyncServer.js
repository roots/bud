"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useHotSyncServer = void 0;
var react_1 = require("react");
var browser_sync_1 = __importDefault(require("browser-sync"));
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
var browserSync = browser_sync_1["default"].create();
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
    bud.logger.info({ name: 'bud.compiler', options: devMiddlewareOptions }, 'making dev server middleware from options');
    var devMiddleware = webpack_dev_middleware_1["default"](bud.compiler, devMiddlewareOptions);
    var hotMiddleware = webpack_hot_middleware_1["default"](bud.compiler, {
        reload: false,
        heartbeat: 2000
    });
    return [devMiddleware, hotMiddleware];
};
var useHotSyncServer = function (bud) {
    var hot = react_1.useState(bud.features.enabled('hot'))[0];
    var target = react_1.useState(bud.options.get('devServer.host'))[0];
    var open = react_1.useState(bud.options.get('devServer.open'))[0];
    var files = react_1.useState(bud.options.get('watch'))[0];
    var _a = react_1.useState(null), hotSyncServer = _a[0], setHotSyncServer = _a[1];
    var _b = react_1.useState(null), devStats = _b[0], setDevStats = _b[1];
    react_1.useEffect(function () {
        if (!hotSyncServer && hot) {
            var options = {
                hot: hot,
                proxy: {
                    target: target,
                    ws: true
                },
                logLevel: 'silent',
                reload: false,
                reloadOnRestart: false,
                open: open,
                middleware: makeMiddleware(bud, setDevStats),
                injectChanges: true,
                injectFileTypes: bud.options
                    .get('resolve.extensions')
                    .map(function (ext) { return ext.replace('.', ''); }),
                watchOptions: {
                    ignoreInitial: false
                },
                files: files
            };
            setHotSyncServer(browserSync.init(options));
            bud.logger.info({ name: 'bud.compiler', options: options, hot: hot }, 'using browserSync as hot sync server');
        }
    }, [hotSyncServer, setHotSyncServer, hot, open, files, target]);
    react_1.useEffect(function () {
        hotSyncServer &&
            bud.logger.info({ name: 'bud.compiler' }, 'hot sync server initialized');
    }, [hotSyncServer]);
    return [hotSyncServer, devStats];
};
exports.useHotSyncServer = useHotSyncServer;
//# sourceMappingURL=useHotSyncServer.js.map