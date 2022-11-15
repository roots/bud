import {bind} from '@roots/bud-support/decorators'
import type {Compiler} from '@roots/bud-support/webpack'
import type HtmlWebpackPlugin from 'html-webpack-plugin'

/**
 * Template variable interpolation plugin for webpack
 *
 * @public
 */
export default class InterpolateHtmlWebpackPlugin {
  /**
   * Plugin name
   *
   * @public
   */
  public name = `interpolate-html-webpack-plugin`

  /**
   * Class constructor
   *
   * @param getHooks - {@link HtmlWebpackPlugin.getHooks}
   * @param replacements - {@link Record} of regular expressions
   *
   * @public
   */
  public constructor(
    public getHooks: (...args: any[]) => HtmlWebpackPlugin.Hooks,
    public replacements: Record<string, RegExp | string>,
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
          if (
            !this.replacements ||
            Object.keys(this.replacements).length === 0
          )
            return data

          Object.entries(this.replacements).forEach(([key, value]) => {
            data.html = data.html
              .replaceAll(new RegExp(`{{${key}}}`, `g`), value)
              .replaceAll(new RegExp(`%${key}%`, `g`), value)
          })

          return data
        },
      ),
    )
  }
}
