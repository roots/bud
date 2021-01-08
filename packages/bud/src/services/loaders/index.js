"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loaders = void 0;
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const css = require.resolve('css-loader');
const file = require.resolve('file-loader');
const minicss = require.resolve(mini_css_extract_plugin_1.default.loader);
const raw = require.resolve('raw-loader');
const resolve = require.resolve('resolve-url-loader');
const style = require.resolve('style-loader');
const url = require.resolve('url-loader');
const cache = require.resolve('cache-loader');
const thread = require.resolve('thread-loader');
const extractCssChunks = require.resolve('extract-css-chunks-webpack-plugin');
exports.loaders = {
    [`css-loader`]: css,
    [`file-loader`]: file,
    [`mini-css-loader`]: minicss,
    [`raw-loader`]: raw,
    [`resolve-url-loader`]: resolve,
    [`style-loader`]: style,
    [`url-loader`]: url,
    [`cache-loader`]: cache,
    [`thread-loader`]: thread,
    [`extract-css-loader`]: extractCssChunks,
};
//# sourceMappingURL=index.js.map