"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.renderCompilerDashboard = void 0;
var webpack_1 = __importDefault(require("webpack"));
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var _1 = require(".");
/**
 * Compiler renderer
 *
 * @type  {BudRenderer}
 * @param {bud} bude
 * @param {Configuration} webpackConfig
 */
var renderCompilerDashboard = function (bud, webpackConfig) {
    var runnerProps = {
        config: bud,
        webpackConfig: webpackConfig,
        compiler: webpack_1["default"](webpackConfig)
    };
    var application = react_1["default"].createElement(_1.Runner, runnerProps);
    /** 🚀 */
    ink_1.render(application);
};
exports.renderCompilerDashboard = renderCompilerDashboard;
