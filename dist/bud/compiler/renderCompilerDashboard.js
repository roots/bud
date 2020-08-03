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
var injectHot = function (webpackConfig, overlay, reload, logger) {
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
/**
 * Webpack compilation dashboard renderer.
 */
var renderCompilerDashboard = function (bud, webpackConfig) {
    var _a, _b;
    var compiler = bud.features.enabled('hot')
        ? webpack_1["default"](injectHot(webpackConfig, (_a = bud.options.get('dev').overlay) !== null && _a !== void 0 ? _a : false, (_b = bud.options.get('dev').reload) !== null && _b !== void 0 ? _b : false, bud.logger))
        : webpack_1["default"](webpackConfig);
    bud.compiler = compiler;
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