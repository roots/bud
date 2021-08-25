import { Module } from '@roots/bud-framework';
import type * as Webpack from 'webpack';
interface RegularExpressionIndex {
    [key: string]: RegExp;
}
declare class InterpolateHtmlPlugin {
    name: string;
    /**
     * @property {Webpack.WebpackPluginInstance} htmlWebpackPlugin
     */
    htmlWebpackPlugin: Webpack.WebpackPluginInstance;
    /**
     * @property {RegularExpressionIndex} replacements
     */
    replacements: RegularExpressionIndex;
    /**
     * @constructor
     */
    constructor(htmlWebpackPlugin: Webpack.WebpackPluginInstance, replacements: RegularExpressionIndex);
    /**
     * @function escapeRegExp
     */
    escapeRegExp(string: String): string;
    /**
     * @function apply
     * @implements Webpack.WebpackPluginInstance['apply']
     */
    apply(compiler: Webpack.Compiler): void;
}
export declare const name: string | number, options: Module.Options<{
    [key: string]: RegExp;
}>, make: Module.Make<InterpolateHtmlPlugin, {
    [key: string]: RegExp;
}>, when: Module.When<{
    [key: string]: RegExp;
}>;
export {};
//# sourceMappingURL=InterpolateHtmlPlugin.d.ts.map