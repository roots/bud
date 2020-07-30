"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.loaders = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
/**
 * Style loaders
 *
 * @type {object} loaders
 */
var loaders = {
    babel: require.resolve('babel-loader'),
    css: require.resolve('css-loader'),
    file: require.resolve('file-loader'),
    eslint: require.resolve('eslint-loader'),
    miniCss: function (hot) { return ({
        loader: mini_css_extract_plugin_1["default"].loader
    }); },
    node: require.resolve('node-loader'),
    postCss: require.resolve('postcss-loader'),
    resolveUrl: require.resolve('resolve-url-loader'),
    scss: require.resolve('sass-loader'),
    style: require.resolve('style-loader'),
    svgr: require.resolve('@svgr/webpack'),
    url: require.resolve('url-loader'),
    ts: require.resolve('ts-loader'),
    vue: require.resolve('vue-loader')
};
exports.loaders = loaders;
//# sourceMappingURL=loaders.js.map