import type {Index} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
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
export class InterpolateHtmlPlugin {
  /**
   * {@link WebpackPluginInstance.name}
   *
   * @public
   */
  public name = 'interpolate-html-plugin'

  /**
   * {@link HtmlWebpackPlugin}
   *
   * @public
   */
  public htmlWebpackPlugin: HtmlWebpackPlugin &
    WebpackPluginInstance

  /**
   * {@link Index} of regular expressions
   *
   * @public
   */
  public replacements: Index<RegExp>

  /**
   * Class constructor
   *
   * @param htmlWebpackPlugin - {@link HtmlWebpackPlugin}
   * @param replacements - {@link Index} of regular expressions
   *
   * @public
   */
  public constructor(
    htmlWebpackPlugin: HtmlWebpackPlugin,
    replacements: Index<RegExp>,
  ) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.replacements = replacements
  }

  /**
   * Returns an escaped regular expression string
   *
   * @public
   */
  public escapeRegExp(string: string): string {
    return string
      .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      .replace(/-/g, '\\x2d')
  }

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
