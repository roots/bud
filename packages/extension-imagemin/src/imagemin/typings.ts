import type {Plugin as ImageminPlugin} from 'imagemin'
import type {
  Framework as Base,
  Index,
  Module,
} from '@roots/bud-typings'

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
  imagemin: Imagemin.Config

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
  imageminOption: Imagemin.ConfigOption

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
  imageminPlugins: Imagemin.ConfigPlugins
}

export namespace Imagemin {
  /**
   * Make.
   */
  export type Make = Module.Make<
    Plugin,
    Options.MinimizerOptions
  >

  /**
   * Conditional.
   */
  export type When = Module.When

  /**
   * Boot extension
   */
  export type Boot = Module.Boot

  /**
   * Plugin class.
   */
  export type Plugin = ImageminPlugin

  /**
   * Plugin options.
   */
  export type Options = {
    minimizerOptions: Options.MinimizerOptions
  }

  /**
   * Plugin options
   */
  export namespace Options {
    /**
     * minimizeroptions.plugins
     */
    export type Plugins = Array<[string, Index<any>]>

    /**
     * minimizeroptions
     */
    export type MinimizerOptions = {
      [key: string]: any

      plugins: Plugins
    }
  }

  /**
   * Configuration API.
   */
  export type Config = (
    this: Framework,
    enabled: boolean,
  ) => Framework

  export type ConfigOption = (
    this: Framework,
    key: string,
    value: unknown,
  ) => Framework

  export type ConfigOptions = (
    this: Framework,
    options?: Options.MinimizerOptions,
  ) => Framework

  export type ConfigPlugins = (
    this: Framework,
    plugins?: Options.Plugins,
  ) => Framework
}
