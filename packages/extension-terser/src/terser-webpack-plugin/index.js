"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
exports.options = {
    terserOptions: {
        parse: {
            ecma: 2018,
        },
        compress: false,
        mangle: {
            safari10: true,
        },
        output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
        },
    },
    extractComments: false,
    parallel: true,
};
const make = (options) => new terser_webpack_plugin_1.default(options.all());
exports.make = make;
const when = ({ store }) => store.enabled('features.minify');
exports.when = when;
//# sourceMappingURL=index.js.map