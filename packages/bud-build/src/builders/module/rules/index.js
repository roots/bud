"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const oneOf_1 = require("./oneOf");
const post_1 = __importDefault(require("./post"));
const pre_1 = __importDefault(require("./pre"));
const rules = function () {
    return {
        rules: this.hooks.filter('webpack.module.rules', [
            ...pre_1.default.bind(this)(),
            {
                oneOf: oneOf_1.oneOf.bind(this)(),
            },
            ...post_1.default.bind(this)(),
        ]),
    };
};
exports.rules = rules;
//# sourceMappingURL=index.js.map