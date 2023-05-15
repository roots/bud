import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  expose,
  label,
  options,
  production,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import type Plugin from 'terser-webpack-plugin'

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
@expose(`terser`)
@options<Options>({
  extractComments: false,
  parallel: true,
  exclude: /node_modules/,
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
@production
export class BudTerser extends Extension<Options> {
  /**
   * {@link Extension.buildBefore}
   */
  public override async buildBefore(bud: Bud) {
    await bud.extensions.add(
      // @ts-ignore
      await this.resolve(
        `@roots/bud-terser/css-minimizer`,
        import.meta.url,
      ),
    )

    await bud.extensions
      .get(`@roots/bud-terser/css-minimizer`)
      // @ts-ignore This method isn't typed but it's there
      .buildBefore(bud)

    const Terser = await import(`terser-webpack-plugin`)

    if (bud.extensions.has(`@roots/bud-swc`)) {
      const value = (_bud: Bud) => Terser.swcMinify
      const callback = (_minify: Options[`minify`]) => value
      this.set(`minify`, callback)
    } else if (bud.extensions.has(`@roots/bud-esbuild`)) {
      const value = (_bud: Bud) => Terser.esbuildMinify
      const callback = (_minify: Options[`minify`]) => value
      this.set(`minify`, callback)
    } else {
      const value = (_bud: Bud) => Terser.terserMinify
      const callback = (_minify: Options[`minify`]) => value
      this.set(`minify`, callback)
    }

    bud.hooks.on(`build.optimization.minimizer`, (minimizers = []) => {
      minimizers = [
        ...minimizers.filter(
          minimizer => !(minimizer instanceof Terser.default),
        ),
        new Terser.default(this.options),
      ]
      this.logger.success(`terser added to minimizers`, minimizers)
      return minimizers
    })
  }

  /**
   * Drop console
   */
  public dropConsole(enable: boolean = true): this {
    this.set(`terserOptions.compress.drop_console`, enable)
    return this
  }

  /**
   * Drop comments
   */
  public dropComments(enable: boolean = true): this {
    this.set(`terserOptions.format.comments`, !enable)
    return this
  }

  /**
   * Drop debugger statements
   */
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
  public mangle(mangle: Plugin.TerserOptions['mangle']): this {
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
      `bud.terser.set('terserOptions.minify', () => () => minifier)`,
    ],
  ])
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
