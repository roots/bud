"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const webpack_manifest_plugin_1 = __importDefault(require("webpack-manifest-plugin"));
exports.options = {
    fileName: 'manifest.json',
    writeToFileEmit: true,
};
const make = (options, { store }) => new webpack_manifest_plugin_1.default(Object.assign(Object.assign({}, options.all()), { publicPath: store.get('webpack.output.publicPath') }));
exports.make = make;
const when = ({ store }) => store.enabled('features.manifest');
exports.when = when;
//# sourceMappingURL=manifest.js.map