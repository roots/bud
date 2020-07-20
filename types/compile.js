"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.compile = void 0;
var webpack_1 = __importDefault(require("webpack"));
var react_1 = __importDefault(require("react"));
var ink_1 = require("ink");
var compiler_1 = require("./compiler");
/**
 * Compile
 */
var compile = function (config, webpackConfig) {
    /**
     * Runner props
     *
     * @typedef  {object.<props>}
     * @property {object.<options>} options
     * @property {object} config - webpack config
     * @property {object} compiler - webpack compiler
     */
    var runnerProps = {
        config: config,
        webpackConfig: webpackConfig,
        compiler: webpack_1["default"](webpackConfig)
    };
    /**
     * Run the compiler.
     */
    ink_1.render(react_1["default"].createElement(compiler_1.Runner, runnerProps));
};
exports.compile = compile;
