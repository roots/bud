import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  disabled,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type {Plugin} from '@roots/bud-support/terser-webpack-plugin'

/**
 * `terser-webpack-plugin` options
 */
export type Options = Plugin.BasePluginOptions & {
  minify?: Plugin.MinimizerImplementation<any>
  include: RegExp
  exclude: RegExp
  extractComments: boolean
  parallel: boolean
  terserOptions?: Plugin.MinimizerOptions<any>
}

/**
 * Terser configuration
 */
@label(`@roots/bud-terser`)
@dependsOn([`@roots/bud-terser/css-minimizer`])
@expose(`terser`)
@options<Options>({
  include: ({hooks}) => hooks.filter(`pattern.js`),
  exclude: ({hooks}) => hooks.filter(`pattern.modules`),
  extractComments: false,
  parallel: true,
  terserOptions: {
    compress: false,
    mangle: {
      safari10: true,
    },
    output: {
      comments: false,
      ascii_only: true,
    },
  },
})
@disabled
export class BudTerser extends Extension<Options> {
  /**
   * {@link Extension.configAfter}
   */
  @bind
  public override async configAfter(bud: Bud) {
    if (!this.enabled) return

    const {Plugin} = await import(
      `@roots/bud-support/terser-webpack-plugin`
    )
    if (!Plugin) return

    if (bud.extensions.has(`@roots/bud-swc`)) {
      this.set(`terserOptions.minify`, Plugin.swcMinify)
    }

    bud.hooks.on(`build.optimization.minimizer`, (minimizers = []) => {
      this.logger.info(`current minimizers:`, minimizers)

      const instance = new Plugin(this.options)
      this.logger.info(`terser instance`, instance)

      minimizers.push(instance)
      this.logger.success(`terser added to minimizers`, minimizers)

      return minimizers
    })
  }

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
    this.set(`terserOptions.output.comments`, enable)
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
  public mangle(mangle: Plugin.TerserOptions['mangle']): this {
    this.set(`terserOptions.mangle`, mangle)
    return this
  }

  /**
   * @deprecated Use {@link BudTerser.dropComments} instead
   */
  @bind
  public comments(comments: boolean = true): this {
    this.set(`terserOptions.output.comments`, comments)
    return this
  }

  /**
   * @deprecated Use {@link BudTerser.dropDebugger} instead
   */
  @bind
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
  @bind
  public setMinifier(minify: any): this {
    this.set(`terserOptions.minify`, minify)
    return this
  }

  /**
   * Terser options getter/setter
   *
   * @deprecated Use {@link BudTerser.set} and {@link BudTerser.get} instead
   *
   * @example
   * ```js
   * bud.terser.set('terserOptions', {})
   * ```
   *
   * @example
   * ```js
   * bud.terser.set('terserOptions.compress', true)
   * ```
   *
   * @example
   * ```js
   * bud.terser.get('terserOptions')
   * ```
   */
  public get terserOptions() {
    return this.get(`terserOptions`) ?? {}
  }
  public set terserOptions(terserOptions: Options['terserOptions']) {
    this.set(`terserOptions`, terserOptions)
  }
}
