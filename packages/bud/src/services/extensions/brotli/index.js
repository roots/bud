"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.when = exports.make = void 0;
const compression_webpack_plugin_1 = __importDefault(require("compression-webpack-plugin"));
const make = options => new compression_webpack_plugin_1.default(options.all());
exports.make = make;
const when = ({ store }) => store.enabled('features.brotli');
exports.when = when;
exports.options = {
    filename: '[path].br[query]',
    algorithm: 'brotliCompress',
    test: /\.js$|\.css$|\.html$|\.html$/,
    compressionOptions: {
        level: 11,
    },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
};
//# sourceMappingURL=index.js.map