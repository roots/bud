"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
const pretty_format_1 = __importDefault(require("pretty-format"));
const format = (obj, options = {}) => pretty_format_1.default(obj, Object.assign({ callToJSON: true, highlight: true, indent: 2 }, options));
exports.format = format;
//# sourceMappingURL=format.js.map