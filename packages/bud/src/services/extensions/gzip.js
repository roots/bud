"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.make = exports.options = exports.when = void 0;
/* eslint-disable prettier/prettier */
const compression_webpack_plugin_1 = __importDefault(require("compression-webpack-plugin"));
const when = bud => bud.store.enabled('features.gzip');
exports.when = when;
exports.options = {
    algorithm: 'gzip',
    filename: '[name][ext].gz[query]',
    test: /\.js$|\.css$|\.html$/,
    compressionOptions: {
        level: 9,
    },
    threshold: 10240,
    minRatio: 0.8,
};
const make = options => new compression_webpack_plugin_1.default(options.all());
exports.make = make;
//# sourceMappingURL=gzip.js.map