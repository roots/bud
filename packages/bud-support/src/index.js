"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutate = exports.useSwr = exports.useSWR = exports.Gradient = exports.Table = exports.Spinner = exports.Link = exports.useInput = exports.useApp = exports.render = exports.Text = exports.Spacer = exports.Box = exports.useState = exports.useLayoutEffect = exports.useCallback = exports.useEffect = exports.React = exports.join = exports.has = exports.set = exports.get = exports.merge = exports.isUndefined = exports.isNull = exports.isEqual = exports.isFunction = exports.isString = exports.isObjectLike = exports.isObject = exports.isArrayLike = exports.isArray = exports.lodash = exports.webpackDevMiddleware = exports.webpackHotMiddleware = exports.createProxyMiddleware = exports.ProxyMiddleware = exports.InterpolateHtmlPlugin = exports.CompressionPlugin = exports.Stats = exports.ProgressPlugin = exports.webpack = exports.maybeAppend = exports.notify = exports.eslintFormatter = exports.ServiceContainer = exports.Service = exports.killPort = exports.dump = exports.build = void 0;
exports.zlib = exports.yargs = exports.prettyFormat = exports.prettier = exports.pino = exports.globby = exports.fs = exports.express = exports.execa = exports.dotenv = exports.chalk = exports.useStdoutDimensions = exports.patchConsole = void 0;
/**
 * Application dev util
 */
const build = __importStar(require("./build"));
exports.build = build;
const dump_1 = require("./util/dump");
Object.defineProperty(exports, "dump", { enumerable: true, get: function () { return dump_1.dump; } });
const killPort_1 = require("./util/killPort");
Object.defineProperty(exports, "killPort", { enumerable: true, get: function () { return killPort_1.killPort; } });
/**
 * Application services base.
 */
var Service_1 = require("./Service");
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return Service_1.Service; } });
Object.defineProperty(exports, "ServiceContainer", { enumerable: true, get: function () { return Service_1.ServiceContainer; } });
/**
 * Application util
 */
var util_1 = require("./util");
Object.defineProperty(exports, "eslintFormatter", { enumerable: true, get: function () { return util_1.eslintFormatter; } });
var notify_1 = require("./util/notify");
Object.defineProperty(exports, "notify", { enumerable: true, get: function () { return notify_1.notify; } });
var maybeAppend_1 = require("./util/maybeAppend");
Object.defineProperty(exports, "maybeAppend", { enumerable: true, get: function () { return maybeAppend_1.maybeAppend; } });
/**
 * Webpack
 */
const webpack_1 = __importDefault(require("webpack"));
exports.webpack = webpack_1.default;
// Plugins
var webpack_2 = require("webpack");
Object.defineProperty(exports, "ProgressPlugin", { enumerable: true, get: function () { return webpack_2.ProgressPlugin; } });
Object.defineProperty(exports, "Stats", { enumerable: true, get: function () { return webpack_2.Stats; } });
const compression_webpack_plugin_1 = __importDefault(require("compression-webpack-plugin"));
exports.CompressionPlugin = compression_webpack_plugin_1.default;
const InterpolateHtmlPlugin_1 = __importDefault(require("./util/InterpolateHtmlPlugin"));
exports.InterpolateHtmlPlugin = InterpolateHtmlPlugin_1.default;
// Middlewares
const webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
exports.webpackDevMiddleware = webpack_dev_middleware_1.default;
const webpack_hot_middleware_1 = __importDefault(require("webpack-hot-middleware"));
exports.webpackHotMiddleware = webpack_hot_middleware_1.default;
const http_proxy_middleware_1 = __importStar(require("http-proxy-middleware"));
exports.ProxyMiddleware = http_proxy_middleware_1.default;
Object.defineProperty(exports, "createProxyMiddleware", { enumerable: true, get: function () { return http_proxy_middleware_1.createProxyMiddleware; } });
/**
 * Lodash
 */
const lodash_1 = __importDefault(require("lodash"));
exports.lodash = lodash_1.default;
var lodash_2 = require("lodash");
Object.defineProperty(exports, "isArray", { enumerable: true, get: function () { return lodash_2.isArray; } });
Object.defineProperty(exports, "isArrayLike", { enumerable: true, get: function () { return lodash_2.isArrayLike; } });
Object.defineProperty(exports, "isObject", { enumerable: true, get: function () { return lodash_2.isObject; } });
Object.defineProperty(exports, "isObjectLike", { enumerable: true, get: function () { return lodash_2.isObjectLike; } });
Object.defineProperty(exports, "isString", { enumerable: true, get: function () { return lodash_2.isString; } });
Object.defineProperty(exports, "isFunction", { enumerable: true, get: function () { return lodash_2.isFunction; } });
Object.defineProperty(exports, "isEqual", { enumerable: true, get: function () { return lodash_2.isEqual; } });
Object.defineProperty(exports, "isNull", { enumerable: true, get: function () { return lodash_2.isNull; } });
Object.defineProperty(exports, "isUndefined", { enumerable: true, get: function () { return lodash_2.isUndefined; } });
Object.defineProperty(exports, "merge", { enumerable: true, get: function () { return lodash_2.merge; } });
Object.defineProperty(exports, "get", { enumerable: true, get: function () { return lodash_2.get; } });
Object.defineProperty(exports, "set", { enumerable: true, get: function () { return lodash_2.set; } });
Object.defineProperty(exports, "has", { enumerable: true, get: function () { return lodash_2.has; } });
Object.defineProperty(exports, "join", { enumerable: true, get: function () { return lodash_2.join; } });
/**
 * React
 */
const react_1 = __importDefault(require("react"));
exports.React = react_1.default;
var react_2 = require("react");
Object.defineProperty(exports, "useEffect", { enumerable: true, get: function () { return react_2.useEffect; } });
Object.defineProperty(exports, "useCallback", { enumerable: true, get: function () { return react_2.useCallback; } });
Object.defineProperty(exports, "useLayoutEffect", { enumerable: true, get: function () { return react_2.useLayoutEffect; } });
Object.defineProperty(exports, "useState", { enumerable: true, get: function () { return react_2.useState; } });
/**
 * Ink
 */
var ink_1 = require("ink");
Object.defineProperty(exports, "Box", { enumerable: true, get: function () { return ink_1.Box; } });
Object.defineProperty(exports, "Spacer", { enumerable: true, get: function () { return ink_1.Spacer; } });
Object.defineProperty(exports, "Text", { enumerable: true, get: function () { return ink_1.Text; } });
Object.defineProperty(exports, "render", { enumerable: true, get: function () { return ink_1.render; } });
Object.defineProperty(exports, "useApp", { enumerable: true, get: function () { return ink_1.useApp; } });
Object.defineProperty(exports, "useInput", { enumerable: true, get: function () { return ink_1.useInput; } });
/**
 * Ink extensions
 */
const ink_link_1 = __importDefault(require("ink-link"));
exports.Link = ink_link_1.default;
const ink_spinner_1 = __importDefault(require("ink-spinner"));
exports.Spinner = ink_spinner_1.default;
const ink_table_1 = __importDefault(require("ink-table"));
exports.Table = ink_table_1.default;
const ink_gradient_1 = __importDefault(require("ink-gradient"));
exports.Gradient = ink_gradient_1.default;
/**
 * React hooks/util.
 */
const swr_1 = __importStar(require("swr"));
exports.useSWR = swr_1.default;
exports.useSwr = swr_1.default;
Object.defineProperty(exports, "mutate", { enumerable: true, get: function () { return swr_1.mutate; } });
const patch_console_1 = __importDefault(require("patch-console"));
exports.patchConsole = patch_console_1.default;
const ink_use_stdout_dimensions_1 = __importDefault(require("ink-use-stdout-dimensions"));
exports.useStdoutDimensions = ink_use_stdout_dimensions_1.default;
/**
 * Dependencies
 */
const chalk_1 = __importDefault(require("chalk"));
exports.chalk = chalk_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
exports.dotenv = dotenv_1.default;
const execa_1 = __importDefault(require("execa"));
exports.execa = execa_1.default;
const express_1 = __importDefault(require("express"));
exports.express = express_1.default;
const fs_extra_1 = __importDefault(require("fs-extra"));
exports.fs = fs_extra_1.default;
const globby_1 = __importDefault(require("globby"));
exports.globby = globby_1.default;
const pino_1 = __importDefault(require("pino"));
exports.pino = pino_1.default;
const prettier_1 = __importDefault(require("prettier"));
exports.prettier = prettier_1.default;
const pretty_format_1 = __importDefault(require("pretty-format"));
exports.prettyFormat = pretty_format_1.default;
const yargs_1 = __importDefault(require("yargs"));
exports.yargs = yargs_1.default;
const zlib_1 = __importDefault(require("zlib"));
exports.zlib = zlib_1.default;
//# sourceMappingURL=index.js.map