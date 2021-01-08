"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const bud_support_1 = require("@roots/bud-support");
const options = bud => Object.fromEntries(bud.env
    .getEntries()
    .filter(([string]) => string.includes('APP_')));
exports.options = options;
const make = options => new bud_support_1.InterpolateHtmlPlugin(html_webpack_plugin_1.default, options.all());
exports.make = make;
const when = ({ store }, options) => store.enabled('features.html') &&
    options.getEntries().length > 0;
exports.when = when;
//# sourceMappingURL=interpolateHtmlPlugin.js.map