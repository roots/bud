import type { Plugin as ImageminPlugin } from 'imagemin';
import type { Framework as Base, Index, Module } from '@roots/bud-typings';
export interface Framework extends Base {
    /**
     * ## bud.imagemin [💁 Fluent]
     *
     * Losslessly images with imagemin.
     *
     * [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.imagemin()
     * ```
     *
     * ```js
     * bud.imagemin(false) // disable
     * ```
     */
    imagemin: Imagemin.Config;
    /**
     * ## bud.imageminOption [💁 Fluent]
     *
     * Configure imagmin setting
     *
     * [🔗 bud.imagemin documentation](#)
     *
     * [🔗 image-minimizer-webpack-plugin documentation](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/)
     *
     * ### Usage
     *
     * ```js
     * bud.imageminOption('severityError', 'warning')
     * ```
     */
    imageminOption: Imagemin.ConfigOption;
    /**
     * ## bud.imageminPlugins [💁 Fluent]
     *
     * Customize imagemin plugins.
     *
     * - [🔗 Documentation](#)
     *
     * ### Usage
     *
     * Shown with defaults:
     *
     * ```js
     * bud.imageminPlugins([
     *   ['gifsicle', {interlaced: true}],
     *   ['jpegtran', {progressive: true}],
     *   ['optipng', {optimizationLevel: 5}],
     *   [
     *     'svgo',
     *     {
     *       plugins: [
     *         {
     *           removeViewBox: false,
     *         },
     *       ],
     *     },
     *   ],
     * ])
     * ```
     */
    imageminPlugins: Imagemin.ConfigPlugins;
}
export declare namespace Imagemin {
    /**
     * Make.
     */
    type Make = Module.Make<Plugin, Options.MinimizerOptions>;
    /**
     * Conditional.
     */
    type When = Module.When;
    /**
     * Boot extension
     */
    type Boot = Module.Boot;
    /**
     * Plugin class.
     */
    type Plugin = ImageminPlugin;
    /**
     * Plugin options.
     */
    type Options = {
        minimizerOptions: Options.MinimizerOptions;
    };
    /**
     * Plugin options
     */
    namespace Options {
        /**
         * minimizeroptions.plugins
         */
        type Plugins = Array<[string, Index<any>]>;
        /**
         * minimizeroptions
         */
        type MinimizerOptions = {
            [key: string]: any;
            plugins: Plugins;
        };
    }
    /**
     * Configuration API.
     */
    type Config = (this: Framework, enabled: boolean) => Framework;
    type ConfigOption = (this: Framework, key: string, value: unknown) => Framework;
    type ConfigOptions = (this: Framework, options?: Options.MinimizerOptions) => Framework;
    type ConfigPlugins = (this: Framework, plugins?: Options.Plugins) => Framework;
}
//# sourceMappingURL=typings.d.ts.map