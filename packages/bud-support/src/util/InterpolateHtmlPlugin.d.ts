import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Compiler } from 'webpack';
/**
 * Interpolate HTML Plugin
 */
export default class InterpolateHtmlPlugin {
    /**
     * HTML Webpack Plugin
     */
    htmlWebpackPlugin: HtmlWebpackPlugin;
    /**
     * Replacements
     */
    replacements: {
        [key: string]: RegExp;
    };
    constructor(htmlWebpackPlugin: HtmlWebpackPlugin, replacements: {
        [key: string]: RegExp;
    });
    apply(compiler: Compiler): void;
}
//# sourceMappingURL=InterpolateHtmlPlugin.d.ts.map