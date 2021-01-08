"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const html_webpack_harddisk_plugin_1 = __importDefault(require("html-webpack-harddisk-plugin"));
const options = (app) => ({
    outputPath: app.dist(),
});
exports.options = options;
const make = options => new html_webpack_harddisk_plugin_1.default(options.all());
exports.make = make;
const when = ({ store }) => store.enabled('features.html');
exports.when = when;
//# sourceMappingURL=htmlHardDisk.js.map