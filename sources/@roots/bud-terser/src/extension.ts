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
import TerserPlugin from 'terser-webpack-plugin'

/**
 * `terser-webpack-plugin` options
 *
 * @public
 */
export type Options = TerserPlugin.BasePluginOptions & {
  minify?: TerserPlugin.MinimizerImplementation<any>
  include: RegExp
  exclude: RegExp
  extractComments: boolean
  parallel: boolean
  terserOptions?: TerserPlugin.MinimizerOptions<any>
}

/**
 * Terser extension
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@options`
 * @decorator `@disabled`
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
      preamble: `/**
  * Minified by @roots/bud
  */`,
    },
  },
})
@disabled
export class BudTerser extends Extension<Options> {
  /**
   * Terser options getter/setter
   */
  public get terserOptions() {
    return this.getOption(`terserOptions`)
  }
  public set terserOptions(terserOptions: Options['terserOptions']) {
    this.setOption(`terserOptions`, terserOptions)
  }

  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async buildBefore(bud: Bud) {
    if (
      !bud.extensions.has(
        // @ts-ignore
        `@roots/bud-swc`,
      )
    )
      return

    const {swcMinify} = await this.import(`terser-webpack-plugin`)
    this.setMinifier(swcMinify)

    bud.hooks.on(`build.optimization.minimizer`, minimizer => {
      minimizer.push(new TerserPlugin(this.options))
      return minimizer
    })
  }

  /**
   * Set minify implementation
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public setMinifier(minify: any): this {
    this.terserOptions = {...(this.terserOptions ?? {}), minify}
    return this
  }

  /**
   * Drop console
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public dropConsole(enable: boolean = true): this {
    this.terserOptions = {
      ...(this.terserOptions ?? {}),
      compress: {
        ...(this.terserOptions.compress ?? {}),
        drop_console: enable,
      },
    }

    return this
  }

  /**
   * Drop comments
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public dropComments(enable: boolean = true): this {
    this.comments(enable === false)

    return this
  }

  /**
   * Output comments
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public comments(comments: boolean = true): this {
    this.terserOptions = {
      ...(this.terserOptions ?? {}),
      output: {
        ...(this.terserOptions.output ?? {}),
        comments,
      },
    }

    return this
  }

  /**
   * Output debugger statements
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public debugger(enable: boolean = true): this {
    this.terserOptions = {
      ...(this.terserOptions ?? {}),
      output: {
        ...(this.terserOptions.output ?? {}),
        debugger: enable,
      },
    }

    return this
  }

  /**
   * Drop debugger statements
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public dropDebugger(enable: boolean = true): this {
    this.debugger(enable === false)

    return this
  }

  /**
   * Mangle output
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public mangle(mangle: Options['terserOptions']['mangle']): this {
    this.terserOptions = {
      ...(this.terserOptions ?? {}),
      mangle,
    }

    return this
  }
}
