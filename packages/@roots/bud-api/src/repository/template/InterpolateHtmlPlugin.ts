import type {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import type {
  Compilation,
  Compiler,
  WebpackPluginInstance,
} from 'webpack'

import {HtmlWebpackPlugin} from './BudHtmlWebpackPlugin'

class InterpolateHtmlPlugin {
  /**
   * The {@link WebpackPluginInstance['name'] plugin name}
   */
  public name = 'interpolate-html-plugin'

  /**
   * The {@link HtmlWebpackPlugin html-webpack-plugin instance}
   */
  public htmlWebpackPlugin: WebpackPluginInstance &
    HtmlWebpackPlugin

  /**
   * The {@link Index<RegExp> replacements index}
   */
  public replacements: Framework.Index<RegExp>

  /**
   * @constructor
   */
  public constructor(
    htmlWebpackPlugin: HtmlWebpackPlugin,
    replacements: Framework.Index<RegExp>,
  ) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.replacements = replacements
  }

  /**
   * Returns a {@link RegExp} escaped string
   */
  public escapeRegExp(string: string): string {
    return string
      .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      .replace(/-/g, '\\x2d')
  }

  /**
   * The {@link WebpackPluginInstance['apply'] plugin apply method}
   */
  public apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(
      'InterpolateHtmlPlugin',
      this.modifyHtmlWebpackPluginOptions,
    )
  }

  @bind
  public modifyHtmlWebpackPluginOptions(
    compilation: Compilation,
  ): void {
    this.htmlWebpackPlugin
      .getHooks(compilation)
      .afterTemplateExecution.tap(
        'InterpolateHtmlPlugin',
        (data: any) => {
          Object.entries(this.replacements).forEach(
            ([key, value]) => {
              data.html = data.html.replace(
                new RegExp(`%${this.escapeRegExp(key)}%`, 'g'),
                value,
              )
            },
          )
        },
      )
  }
}

export {InterpolateHtmlPlugin}
