import {bind} from 'helpful-decorators'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type {Compilation, Compiler} from 'webpack'

/**
 * Template variable interpolation plugin for {@link webpack}
 *
 * @public
 */
export class InterpolateHtmlPlugin {
  /**
   * Class constructor
   *
   * @param htmlWebpackPlugin - {@link HtmlWebpackPlugin}
   * @param replacements - {@link Record} of regular expressions
   *
   * @public
   */
  public constructor(
    public htmlWebpackPlugin: HtmlWebpackPlugin,
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
    compiler.hooks.compilation.tap(
      'InterpolateHtmlPlugin',
      this.modifyHtmlWebpackPluginOptions,
    )
  }

  /**
   * @param compilation - {@link Compilation}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public modifyHtmlWebpackPluginOptions(compilation: Compilation): void {
    HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tap(
      'InterpolateHtmlPlugin',
      (data: any) => {
        Object.entries(this.replacements).forEach(([key, value]) => {
          data.html = data.html.replaceAll(
            new RegExp(`%${key}%`, 'g'),
            value,
          )
        })

        return data
      },
    )
  }
}
