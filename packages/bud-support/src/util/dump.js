"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dump = void 0;
const pretty_format_1 = __importDefault(require("pretty-format"));
const dump = (obj, options = {
    callToJSON: true,
    highlight: true,
    indent: 2,
}) => {
    console.log(pretty_format_1.default(obj, options));
};
exports.dump = dump;
//# sourceMappingURL=dump.js.map