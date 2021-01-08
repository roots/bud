"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pretty = void 0;
const prettier_1 = __importDefault(require("prettier"));
const pretty = (contents, parser) => {
    return prettier_1.default.format(contents, parser ? { parser } : undefined);
};
exports.pretty = pretty;
//# sourceMappingURL=pretty.js.map