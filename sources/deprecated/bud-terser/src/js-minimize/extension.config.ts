import {
  Extension,
  type OptionCallback,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {
  bind,
  deprecated,
  options,
} from '@roots/bud-framework/extension/decorators'
import type * as Terser from 'terser'
import type Plugin from 'terser-webpack-plugin'
import type {TerserOptions} from 'terser-webpack-plugin'

/**
 * JS Minimizer configuration
 */
interface BudMinimizeJSOptions extends Plugin.BasePluginOptions {
  minify: Plugin.MinimizerImplementation<TerserOptions>
  include: Plugin.BasePluginOptions[`include`]
  exclude: Plugin.BasePluginOptions[`exclude`]
  extractComments: Plugin.BasePluginOptions[`extractComments`]
  parallel: Plugin.BasePluginOptions[`parallel`]
  terserOptions: TerserOptions & {
    compress: Terser.CompressOptions
    format: Terser.FormatOptions
    mangle: Terser.MangleOptions | boolean
    ecma: Terser.ECMA
    enclose: boolean | string
    ie8: boolean
    keep_classnames: boolean | RegExp
    keep_fnames: boolean | RegExp
    module: boolean
    nameCache: object
    parse: Terser.ParseOptions
    safari10: boolean
    sourceMap: Terser.SourceMapOptions | boolean
    toplevel: boolean
  }
}

type BudMinimizeJSPublicInterface = StrictPublicExtensionApi<
  BudMinimizeJSPublicApi,
  BudMinimizeJSOptions
> & {
  dropComments: (enable?: boolean) => BudMinimizeJSPublicInterface
  dropConsole: (enable?: boolean) => BudMinimizeJSPublicInterface
  dropDebugger: (enable?: boolean) => BudMinimizeJSPublicInterface
  mangle: (
    mangle: OptionCallback<
      BudMinimizeJSPublicInterface['terserOptions'],
      `mangle`
    >,
  ) => BudMinimizeJSPublicInterface
}

/**
 * Terser configuration
 */
@options<BudMinimizeJSOptions>({
  minify: undefined,
  include: undefined,
  exclude: undefined,
  extractComments: false,
  parallel: true,
  terserOptions: {
    compress: {
      drop_console: false,
      drop_debugger: true,
      defaults: true,
      unused: true,
    },
    format: {
      ascii_only: true,
      comments: false,
    },
    ecma: undefined,
    enclose: undefined,
    ie8: undefined,
    keep_classnames: undefined,
    keep_fnames: undefined,
    mangle: {
      safari10: true,
    },
    module: undefined,
    nameCache: undefined,
    parse: undefined,
    safari10: undefined,
    sourceMap: undefined,
    toplevel: undefined,
  },
})
class BudMinimizeJSPublicApi
  extends Extension<BudMinimizeJSOptions>
  implements BudMinimizeJSPublicInterface
{
  /**
   * extractComments value
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments}
   */
  public declare extractComments: BudMinimizeJSPublicInterface['extractComments']
  /**
   * Get extractComments
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments}
   */
  public declare getExtractComments: BudMinimizeJSPublicInterface['getExtractComments']
  /**
   * Set extractComments
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments}
   */
  public declare setExtractComments: BudMinimizeJSPublicInterface['setExtractComments']

  /**
   * parallel value
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#parallel}
   */
  public declare parallel: BudMinimizeJSPublicInterface['parallel']
  /**
   * Get parallel
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#parallel}
   */
  public declare getParallel: BudMinimizeJSPublicInterface['getParallel']
  /**
   * Set parallel
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#parallel}
   */
  public declare setParallel: BudMinimizeJSPublicInterface['setParallel']

  /**
   * Value of {@link Options.minify}
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#minify}
   */
  public declare minify: BudMinimizeJSPublicInterface['minify']
  /**
   * Get minify
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#minify}
   */
  public declare getMinify: BudMinimizeJSPublicInterface['getMinify']
  /**
   * Set minify
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#minify}
   */
  public declare setMinify: BudMinimizeJSPublicInterface['setMinify']

  /**
   * Set include
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#include}
   */
  public declare include: BudMinimizeJSPublicInterface['include']
  /**
   * Get include
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#include}
   */
  public declare getInclude: BudMinimizeJSPublicInterface['getInclude']
  /**
   * Set include
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#include}
   */
  public declare setInclude: BudMinimizeJSPublicInterface['setInclude']

  /**
   * Exclude
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#exclude}
   */
  public declare exclude: BudMinimizeJSPublicInterface['exclude']

  /**
   * Get exclude
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#exclude}
   */
  public declare getExclude: BudMinimizeJSPublicInterface['getExclude']

  /**
   * Set exclude
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#exclude}
   */
  public declare setExclude: BudMinimizeJSPublicInterface['setExclude']

  /**
   * terserOptions
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#terserOptions}
   */
  public declare terserOptions: BudMinimizeJSPublicInterface['terserOptions']
  /**
   * Get terserOptions
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#terserOptions}
   */
  public declare getTerserOptions: BudMinimizeJSPublicInterface['getTerserOptions']
  /**
   * Set terserOptions
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#terserOptions}
   */
  public declare setTerserOptions: BudMinimizeJSPublicInterface['setTerserOptions']

  /**
   * Drop console
   */
  @bind
  public dropConsole(enable: boolean = true): this {
    this.set(`terserOptions.compress.drop_console`, enable)
    return this
  }

  /**
   * Drop comments
   */
  @bind
  public dropComments(enable: boolean = true): this {
    this.set(`terserOptions.format.comments`, !enable)
    return this
  }

  /**
   * Drop debugger statements
   */
  @bind
  public dropDebugger(enable: boolean = true): this {
    this.set(`terserOptions.compress.drop_debugger`, enable)
    return this
  }

  /**
   * Mangle output
   * @deprecated Use {@link BudTerser.set} instead
   *
   * @example
   * ```js
   * bud.minify.js.set(`terserOptions.mangle`, {})
   * ```
   */
  @bind
  public mangle(
    mangle: BudMinimizeJSPublicInterface['terserOptions']['mangle'],
  ): this {
    this.set(`terserOptions.mangle`, mangle)
    return this
  }

  /**
   * @deprecated Use {@link BudTerser.dropComments} instead
   */
  @deprecated(`bud.minify.js`, `Use bud.minify.js.dropComments instead`, [
    [`Drop comments`, `bud.minify.js.dropComments()`],
    [`Preserve comments`, `bud.minify.js.dropComments(false)`],
    [
      `Alternative (using bud.minify.js.set)`,
      `bud.minify.js.set('terserOptions.format.comments', true)`,
    ],
  ])
  public comments(comments: boolean = true): this {
    this.set(`terserOptions.format.comments`, comments)
    return this
  }

  /**
   * @deprecated Use {@link BudTerser.dropDebugger} instead
   */
  @deprecated(`bud.minify.js`, `Use bud.minify.js.dropDebugger instead`, [
    [`Drop debugger statements`, `bud.minify.js.dropDebugger()`],
    [`Preserve debugger statements`, `bud.minify.js.dropDebugger(false)`],
    [
      `Alternative (using bud.minify.js.set)`,
      `bud.minify.js.set('terserOptions.compress.drop_debugger', true)`,
    ],
  ])
  public debugger(enable: boolean = true): this {
    this.set(`terserOptions.compress.drop_debugger`, enable)
    return this
  }

  /**
   * @deprecated Use {@link BudTerser.set} instead
   *
   * @example
   * ```js
   * bud.minify.js.set(`terserOptions.minify`, () => {})
   * ```
   */
  @deprecated(`bud.minify.js`, `Use bud.minify.js.set instead`, [
    [
      `Set the minifier`,
      `bud.minify.js.set('terserOptions.minify', () => minifier)`,
    ],
  ])
  public setMinifier(minify: any): this {
    this.set(`minify`, minify)
    return this
  }
}

export {
  BudMinimizeJSPublicApi,
  type BudMinimizeJSPublicInterface,
  type BudMinimizeJSOptions,
}
