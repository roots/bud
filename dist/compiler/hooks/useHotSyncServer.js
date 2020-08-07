var _a = require('react'), useState = _a.useState, useEffect = _a.useEffect;
var browserSync = require('browser-sync').create();
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var makeMiddleware = function (bud, setDevStats) {
    var devMiddlewareOptions = {
        headers: bud.options.get('dev').headers,
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
    var devMiddleware = webpackDevMiddleware(bud.compiler, devMiddlewareOptions);
    var hotMiddleware = webpackHotMiddleware(bud.compiler, {
        reload: false,
        heartbeat: 2000
    });
    return [devMiddleware, hotMiddleware];
};
var useHotSyncServer = function (bud) {
    var hot = useState(bud.features.enabled('hot'))[0];
    var target = useState(bud.options.get('dev').host)[0];
    var open = useState(bud.options.get('dev').open)[0];
    var files = useState(bud.options.get('watch'))[0];
    var _a = useState(null), hotSyncServer = _a[0], setHotSyncServer = _a[1];
    var _b = useState(null), devStats = _b[0], setDevStats = _b[1];
    useEffect(function () {
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
                injectFileTypes: ['js', 'scss', 'css', 'vue', 'jsx', 'ts', 'tsx'],
                watchOptions: {
                    ignoreInitial: false
                },
                files: files
            };
            setHotSyncServer(browserSync.init(options));
            bud.logger.info({ name: 'bud.compiler', options: options, hot: hot }, 'using browserSync as hot sync server');
        }
    }, [hotSyncServer, setHotSyncServer, hot, open, files, target]);
    useEffect(function () {
        hotSyncServer &&
            bud.logger.info({ name: 'bud.compiler' }, 'hot sync server initialized');
    }, [hotSyncServer]);
    return [hotSyncServer, devStats];
};
export { useHotSyncServer };
//# sourceMappingURL=useHotSyncServer.js.map