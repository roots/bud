"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.miniCssExtract = void 0;
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var miniCssExtract = function (bud) { return ({
    bud: bud,
    name: 'mini-css-extract-plugin',
    options: {
        hmr: bud.features.enabled('hot'),
        filename: bud.features.enabled('hash')
            ? bud.options.get('filenameTemplate').hashed + ".css"
            : bud.options.get('filenameTemplate')["default"] + ".css"
    },
    make: function () {
        return new mini_css_extract_plugin_1["default"](this.options);
    },
    when: function () {
        return this.bud.inProduction;
    }
}); };
exports.miniCssExtract = miniCssExtract;
//# sourceMappingURL=miniCssExtract.js.map