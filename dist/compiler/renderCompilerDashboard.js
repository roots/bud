"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.renderCompilerDashboard = void 0;
var webpack_1 = __importDefault(require("webpack"));
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var Runner_1 = require("./Runner");
var browser_sync_1 = __importDefault(require("browser-sync"));
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
var bud_1 = require("../bud");
var makeMiddleware = function (webpackConfig, compiler) { return [
    webpack_dev_middleware_1["default"](compiler, {
        headers: bud_1.bud.state.options.dev.headers,
        logLevel: 'silent',
        publicPath: bud_1.bud.state.paths.public || '/',
        stats: {
            all: false
        }
    }),
    webpack_hot_middleware_1["default"](compiler, {
        log: function () { }
    }),
]; };
var injectHot = function (webpackConfig) {
    var client = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&overlay=true';
    Object.keys(webpackConfig.entry).forEach(function (entry) {
        webpackConfig.entry[entry] = [client].concat(webpackConfig.entry[entry]);
    });
    return webpackConfig;
};
var hotSyncServer = function (bud, webpackConfig, compiler) {
    browser_sync_1["default"].init({
        proxy: {
            target: 'bud-sandbox.valet',
            ws: true
        },
        reloadOnRestart: true,
        injectFileTypes: ['js', 'css'],
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
        },
        open: true,
        ui: {
            port: 3000
        },
        middleware: makeMiddleware(webpackConfig, compiler),
        injectChanges: true,
        watchOptions: {
            ignoreInitial: true
        },
        files: [
            bud.src('**/*.js'),
            bud.src('**/*.js'),
            bud.src('*.css'),
            bud.src('**/*.css'),
        ]
    });
};
/**
 * Webpack compilation dashboard renderer.
 */
var renderCompilerDashboard = function (bud, webpackConfig) {
    var compiler = bud.featureEnabled('hot')
        ? webpack_1["default"](injectHot(webpackConfig))
        : webpack_1["default"](webpackConfig);
    bud.featureEnabled('hot') && hotSyncServer(bud, webpackConfig, compiler);
    var runnerProps = {
        config: bud,
        webpackConfig: webpackConfig,
        compiler: compiler
    };
    var application = react_1["default"].createElement(Runner_1.Runner, runnerProps);
    /** 🚀 */
    ink_1.render(application);
};
exports.renderCompilerDashboard = renderCompilerDashboard;
//# sourceMappingURL=renderCompilerDashboard.js.map