"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.loader = exports.ident = void 0;
const mini_svg_data_uri_1 = __importDefault(require("mini-svg-data-uri"));
exports.ident = 'svg';
exports.loader = 'resolve-url-loader';
exports.options = {
    generator: (content) => mini_svg_data_uri_1.default(content.toString()),
};
//# sourceMappingURL=svg.js.map