import type { Framework } from '@roots/bud-framework';
import type { Compilation, Compiler, WebpackPluginInstance } from 'webpack';
import { HtmlWebpackPlugin } from './BudHtmlWebpackPlugin';
declare class InterpolateHtmlPlugin {
    /**
     * The {@link WebpackPluginInstance['name'] plugin name}
     */
    name: string;
    /**
     * The {@link HtmlWebpackPlugin html-webpack-plugin instance}
     */
    htmlWebpackPlugin: WebpackPluginInstance & HtmlWebpackPlugin;
    /**
     * The {@link Index<RegExp> replacements index}
     */
    replacements: Framework.Index<RegExp>;
    /**
     * @constructor
     */
    constructor(htmlWebpackPlugin: HtmlWebpackPlugin, replacements: Framework.Index<RegExp>);
    /**
     * Returns a {@link RegExp} escaped string
     */
    escapeRegExp(string: string): string;
    /**
     * The {@link WebpackPluginInstance['apply'] plugin apply method}
     */
    apply(compiler: Compiler): void;
    modifyHtmlWebpackPluginOptions(compilation: Compilation): void;
}
export { InterpolateHtmlPlugin };
//# sourceMappingURL=InterpolateHtmlPlugin.d.ts.map