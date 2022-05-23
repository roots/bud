import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type TerserPlugin from 'terser-webpack-plugin'

type Options = TerserPlugin.BasePluginOptions & {
  minify?: TerserPlugin.MinimizerImplementation<any>
  terserOptions?: TerserPlugin.MinimizerOptions<any>
}

/**
 * Bud Terser extension
 *
 * @remarks
 * Offers a more comprehensive terser API than bud core.
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@options`
 */
@label('@roots/bud-terser')
@expose('terser')
@options({
  include: app => app.hooks.filter('pattern.js'),
  extractComments: false,
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
    sourceMap: 'inline',
  },
})
export default class Terser extends Extension<Options> {
  /**
   * Terser options getter/setter
   */
  public get terserOptions() {
    return this.getOption('terserOptions')
  }
  public set terserOptions(terserOptions: Options['terserOptions']) {
    this.setOption('terserOptions', terserOptions)
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
   * Output comments
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
   * Drop comments
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
   * Mangle
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

  /**
   * `beforeBuild` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async beforeBuild() {
    const {default: TerserPlugin} = await this.import(
      'terser-webpack-plugin',
    )

    this.app.hooks.on('build.optimization.minimizer', minimizer => {
      minimizer.push(new TerserPlugin(this.options))
      return minimizer.filter(item => item !== '...')
    })
  }

  /**
   * `when` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async when() {
    return this.app.hooks.filter('build.optimization.minimize')
  }
}
