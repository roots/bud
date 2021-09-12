import type {Framework} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import type {
  Compilation,
  Compiler,
  WebpackPluginInstance,
} from 'webpack'

import {HtmlWebpackPlugin} from './BudHtmlWebpackPlugin'

/**
 * Template variable interpolation plugin for {@link webpack}
 *
 * @public
 */
class InterpolateHtmlPlugin {
  /**
   * {@link WebpackPluginInstance.name}
   */
  public name = 'interpolate-html-plugin'

  /**
   * {@link HtmlWebpackPlugin}
   */
  public htmlWebpackPlugin: HtmlWebpackPlugin &
    WebpackPluginInstance

  /**
   * {@link Index} of {@link RegExp}
   */
  public replacements: Framework.Index<RegExp>

  /**
   * Class constructor
   *
   * @param htmlWebpackPlugin - {@link HtmlWebpackPlugin}
   * @param replacements - {@link Index} of {@link RegExp}
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
   * {@link WebpackPluginInstance.apply}
   */
  public apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(
      'InterpolateHtmlPlugin',
      this.modifyHtmlWebpackPluginOptions,
    )
  }

  /**
   * @param compilation - {@link Compilation}
   *
   * @decorator `@bind`
   */
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
