"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/** Patched compiler.*/
var vue_template_compiler_1 = __importDefault(require("./vue-template-compiler"));
var loader = require.resolve('vue-loader');
var rule = function () { return ({
    test: /\.vue$/,
    exclude: function (file) {
        return /node_modules/.test(file) && !/\.vue\.js/.test(file);
    },
    use: [
        {
            loader: loader,
            options: {
                compiler: vue_template_compiler_1["default"]
            }
        },
    ]
}); };
exports["default"] = rule;
//# sourceMappingURL=rule.js.map