"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.terser = void 0;
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var terser = function () { return ({
    setOptions: function () {
        return {
            parallel: true,
            terserOptions: {
                ecma: 6
            }
        };
    },
    make: function () {
        return new terser_webpack_plugin_1["default"](this.options);
    },
    when: function () {
        return this.bud.featureEnabled('terser') &&
            this.bud.featureEnabled('minify');
    }
}); };
exports.terser = terser;
//# sourceMappingURL=terser.js.map