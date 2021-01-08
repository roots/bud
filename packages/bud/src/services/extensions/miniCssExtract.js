"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.when = exports.make = void 0;
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const make = opt => new mini_css_extract_plugin_1.default(opt.all());
exports.make = make;
const when = ({ mode }) => mode.is('production');
exports.when = when;
const options = () => ({
    /**
     * Works like [`output.filename`](https://webpack.js.org/configuration/output/#outputfilename).
     */
    filename: '[name].[contenthash].css',
});
exports.options = options;
//# sourceMappingURL=miniCssExtract.js.map