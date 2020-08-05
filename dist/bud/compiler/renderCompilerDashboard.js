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
/**
 * Inject webpack middleware on all entrypoints.
 */
var injectHot = function (_a) {
    var webpackConfig = _a.webpackConfig, overlay = _a.overlay, reload = _a.reload, logger = _a.logger;
    var client = "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=" + reload + "&overlay=" + overlay;
    Object.keys(webpackConfig.entry).forEach(function (entry) {
        webpackConfig.entry[entry] = [client].concat(webpackConfig.entry[entry]);
        logger.info({
            name: 'bud.compiler',
            value: webpackConfig.entry[entry]
        }, "injecting hot middleware");
    });
    return webpackConfig;
};
var renderCompilerDashboard = function (bud, webpackConfig) {
    bud.compiler = bud.features.enabled('hot')
        ? webpack_1["default"](injectHot({
            webpackConfig: webpackConfig,
            overlay: bud.options.get('dev').overlay ? true : true,
            reload: bud.options.get('dev').reload ? true : true,
            logger: bud.logger
        }))
        : webpack_1["default"](webpackConfig);
    bud.logger.info({
        name: 'bud.compiler'
    }, "compiler attached to bud");
    var props = { bud: bud };
    var application = react_1["default"].createElement(Runner_1.Runner, props);
    /** 🚀 */
    ink_1.render(application);
};
exports.renderCompilerDashboard = renderCompilerDashboard;
//# sourceMappingURL=renderCompilerDashboard.js.map