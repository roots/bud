"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.when = exports.make = void 0;
const extract_css_chunks_webpack_plugin_1 = __importDefault(require("extract-css-chunks-webpack-plugin"));
const make = options => new extract_css_chunks_webpack_plugin_1.default(options.all());
exports.make = make;
const when = bud => bud.mode.is('production');
exports.when = when;
const options = () => ({
    filename: '[name].css',
    chunkFilename: '[id].css',
});
exports.options = options;
//# sourceMappingURL=index.js.map