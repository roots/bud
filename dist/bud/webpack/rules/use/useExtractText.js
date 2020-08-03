"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useExtractText = void 0;
var extract_text_webpack_plugin_1 = __importDefault(require("extract-text-webpack-plugin"));
var useExtractText = function (rule, bud) {
    var loader = extract_text_webpack_plugin_1["default"].extract({
        fallback: "style-loader",
        use: "css-loader"
    });
    bud.logger.info({ name: rule, loader: loader }, "using extract-text-webpack-plugin");
    return loader;
};
exports.useExtractText = useExtractText;
//# sourceMappingURL=useExtractText.js.map