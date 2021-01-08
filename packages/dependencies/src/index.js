"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yarn = exports.Npm = exports.default = void 0;
const npm_1 = __importDefault(require("./npm"));
exports.Npm = npm_1.default;
const yarn_1 = __importDefault(require("./yarn"));
exports.Yarn = yarn_1.default;
const dependencies_1 = __importDefault(require("./dependencies"));
exports.default = dependencies_1.default;
//# sourceMappingURL=index.js.map