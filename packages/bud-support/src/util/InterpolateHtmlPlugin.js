"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const escape_string_regexp_1 = __importDefault(require("escape-string-regexp"));
/**
 * Interpolate HTML Plugin
 */
class InterpolateHtmlPlugin {
    constructor(htmlWebpackPlugin, replacements) {
        this.htmlWebpackPlugin = htmlWebpackPlugin;
        this.replacements = replacements;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('InterpolateHtmlPlugin', (compilation) => {
            /**
             * @todo fix hack any
             */
            ;
            this.htmlWebpackPlugin
                .getHooks(compilation)
                .afterTemplateExecution.tap('InterpolateHtmlPlugin', data => {
                // Run HTML through a series of user-specified string replacements.
                Object.keys(this.replacements).forEach(key => {
                    const value = this.replacements[key];
                    data.html = data.html.replace(new RegExp('%' + escape_string_regexp_1.default(key) + '%', 'g'), value);
                });
            });
        });
    }
}
exports.default = InterpolateHtmlPlugin;
//# sourceMappingURL=InterpolateHtmlPlugin.js.map