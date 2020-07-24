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
 * Webpack compilation dashboard renderer.
 */
var renderCompilerDashboard = function (bud, webpackConfig) {
    /**
     * Runner props
     */
    var runnerProps = {
        config: bud,
        webpackConfig: webpackConfig,
        compiler: webpack_1["default"](webpackConfig)
    };
    var application = react_1["default"].createElement(Runner_1.Runner, runnerProps);
    /** 🚀 */
    ink_1.render(application);
};
exports.renderCompilerDashboard = renderCompilerDashboard;
//# sourceMappingURL=renderCompilerDashboard.js.map