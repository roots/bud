"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.when = exports.make = exports.options = void 0;
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const options = () => ({
    patterns: null,
});
exports.options = options;
const make = options => new copy_webpack_plugin_1.default(options.all());
exports.make = make;
const when = (_, options) => options.has('patterns');
exports.when = when;
//# sourceMappingURL=index.js.map