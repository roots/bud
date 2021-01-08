"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
/**
 * Options
 */
const options = ({ disk, }) => ({
    alwaysWriteToDisk: true,
    base: disk.baseDir,
    template: disk.path.join(disk.path.dirname(require.resolve('@roots/bud-support')), '/../../publish/template.html'),
});
exports.options = options;
/**
 * Make plugin
 */
const make = (options, { store }) => {
    var _a;
    return new html_webpack_plugin_1.default(Object.assign(Object.assign({}, ((_a = options.all()) !== null && _a !== void 0 ? _a : [])), { publicPath: store.get('webpack.output.publicPath') }));
};
exports.make = make;
/**
 * Conditions
 */
const when = ({ store }) => store.enabled('features.html');
exports.when = when;
//# sourceMappingURL=html.js.map