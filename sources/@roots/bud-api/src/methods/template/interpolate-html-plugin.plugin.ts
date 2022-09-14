import {bind} from '@roots/bud-support/decorators'
import type HtmlWebpackPlugin from 'html-webpack-plugin'
import type {Compilation, Compiler} from 'webpack'

/**
 * Template variable interpolation plugin for {@link webpack}
 *
 * @public
 */
export default class InterpolateHtmlPlugin {
  public name = `interpolate-html-plugin`

  /**
   * Class constructor
   *
   * @param getHooks - {@link HtmlWebpackPlugin.getHooks}
   * @param replacements - {@link Record} of regular expressions
   *
   * @public
   */
  public constructor(
    public getHooks: (compilation: Compilation) => HtmlWebpackPlugin.Hooks,
    public replacements: Record<string, RegExp>,
  ) {}

  /**
   * {@link WebpackPluginInstance.apply}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(`InterpolateHtmlPlugin`, compilation =>
      this.getHooks(compilation).afterTemplateExecution.tap(
        `interpolate-html-plugin`,
        (data: any) => {
          Object.entries(this.replacements).forEach(([key, value]) => {
            data.html = data.html.replaceAll(
              new RegExp(`%${key}%`, `g`),
              value,
            )
          })

          return data
        },
      ),
    )
  }
}
