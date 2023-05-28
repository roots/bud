import {
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {
  bind,
  deprecated,
  options,
} from '@roots/bud-framework/extension/decorators'
import type Plugin from 'terser-webpack-plugin'

/**
 * `terser-webpack-plugin` options
 */
interface Options extends Plugin.BasePluginOptions {
  minify: Plugin.MinimizerImplementation<any>
  include: RegExp
  exclude: RegExp
  extractComments: boolean
  parallel: boolean
  terserOptions?: Plugin.MinimizerOptions<any>
}

type Api = StrictPublicExtensionApi<BudTerserConfigApi, Partial<Options>>

/**
 * Terser configuration
 */
@options<Options>({
  minify: undefined,
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
    mangle: {
      safari10: true,
    },
  },
})
class BudTerserConfigApi extends Extension<Options> {
  /**
   * extractComments value
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments}
   */
  public declare extractComments: Api['extractComments']

  /**
   * Get extractComments
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments}
   */
  public declare getExtractComments: Api['getExtractComments']

  /**
   * Set extractComments
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments}
   */
  public declare setExtractComments: Api['setExtractComments']

  /**
   * parallel value
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#parallel}
   */
  public declare parallel: Api['parallel']

  /**
   * Get parallel
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#parallel}
   */
  public declare getParallel: Api['getParallel']

  /**
   * Set parallel
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#parallel}
   */
  public declare setParallel: Api['setParallel']

  /**
   * Value of {@link Options.minify}
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#minify}
   */
  public declare minify: Api['minify']

  /**
   * Get minify
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#minify}
   */
  public declare getMinify: Api['getMinify']

  /**
   * Set minify
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#minify}
   */
  public declare setMinify: Api['setMinify']

  /**
   * Set include
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#include}
   */
  public declare include: Api['include']

  public declare getInclude: Api['getInclude']

  /**
   * Set include
   *
   * @see {@link https://github.com/webpack-contrib/terser-webpack-plugin#include}
   */
  public declare setInclude: Api['setInclude']

  public declare exclude: Api['exclude']

  public declare getExclude: Api['getExclude']

  public declare setExclude: Api['setExclude']

  public declare terserOptions: Api['terserOptions']

  public declare getTerserOptions: Api['getTerserOptions']

  public declare setTerserOptions: Api['setTerserOptions']

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
   * bud.terser.set(`terserOptions.mangle`, {})
   * ```
   */
  @bind
  public mangle(mangle: Options['terserOptions']['mangle']): this {
    this.set(`terserOptions.mangle`, mangle)
    return this
  }

  /**
   * @deprecated Use {@link BudTerser.dropComments} instead
   */
  @deprecated(`bud.terser`, `Use bud.terser.dropComments instead`, [
    [`Drop comments`, `bud.terser.dropComments()`],
    [`Preserve comments`, `bud.terser.dropComments(false)`],
    [
      `Alternative (using bud.terser.set)`,
      `bud.terser.set('terserOptions.format.comments', true)`,
    ],
  ])
  public comments(comments: boolean = true): this {
    this.set(`terserOptions.format.comments`, comments)
    return this
  }

  /**
   * @deprecated Use {@link BudTerser.dropDebugger} instead
   */
  @deprecated(`bud.terser`, `Use bud.terser.dropDebugger instead`, [
    [`Drop debugger statements`, `bud.terser.dropDebugger()`],
    [`Preserve debugger statements`, `bud.terser.dropDebugger(false)`],
    [
      `Alternative (using bud.terser.set)`,
      `bud.terser.set('terserOptions.compress.drop_debugger', true)`,
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
   * bud.terser.set(`terserOptions.minify`, () => {})
   * ```
   */
  @deprecated(`bud.terser`, `Use bud.terser.set instead`, [
    [
      `Set the minifier`,
      `bud.terser.set('terserOptions.minify', () => minifier)`,
    ],
  ])
  public setMinifier(minify: any): this {
    this.set(`minify`, minify)
    return this
  }
}

export {BudTerserConfigApi, type Api, type Options}
