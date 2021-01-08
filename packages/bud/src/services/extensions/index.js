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
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensions = exports.Brotli = void 0;
const cleanWebpack = __importStar(require("./cleanWebpack"));
const gzip = __importStar(require("./gzip"));
const brotli = __importStar(require("./brotli"));
const ignoreEmit = __importStar(require("./ignoreEmit"));
const configDump = __importStar(require("./webpackConfigDump"));
const copy = __importStar(require("./copy"));
const define = __importStar(require("./define"));
const hashedModuleIds = __importStar(require("./hashedModuleIds"));
const hotModuleReplacement = __importStar(require("./hmr"));
const html = __importStar(require("./html"));
const htmlHardDisk = __importStar(require("./htmlHardDisk"));
const interpolateHtml = __importStar(require("./interpolateHtmlPlugin"));
const manifest = __importStar(require("./manifest"));
const miniCssExtract = __importStar(require("./miniCssExtract"));
const provide = __importStar(require("./provide"));
const writeFile = __importStar(require("./writeFile"));
exports.Brotli = __importStar(require("./brotli/typings"));
exports.extensions = {
    [`clean-webpack-plugin`]: cleanWebpack,
    [`compression-webpack-plugin-gzip`]: gzip,
    [`compression-webpack-plugin-brotli`]: brotli,
    [`hashed-module-ids-plugin`]: hashedModuleIds,
    [`ignore-emit-webpack-plugin`]: ignoreEmit,
    [`webpack-config-dump-plugin`]: configDump,
    [`copy-webpack-plugin`]: copy,
    [`webpack-define-plugin`]: define,
    [`webpack-hot-module-replacement-plugin]`]: hotModuleReplacement,
    [`html-webpack-plugin`]: html,
    [`html-hard-disk-plugin`]: htmlHardDisk,
    [`interpolate-html-plugin`]: interpolateHtml,
    [`webpack-manifest-plugin`]: manifest,
    [`mini-css-extract-plugin`]: miniCssExtract,
    [`webpack-provide-plugin`]: provide,
    [`write-file-webpack-plugin`]: writeFile,
};
//# sourceMappingURL=index.js.map