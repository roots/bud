import escapeString from 'escape-string-regexp'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type {Compiler, compilation} from 'webpack'
import type {Tapable} from 'tapable'

/**
 * @class InterpolateHtmlPlugin
 * @implements Tapable.Plugin
 */
export default class InterpolateHtmlPlugin
  implements Tapable.Plugin {
  /**
   * @property name
   */
  public name: 'interpolate-html-plugin'

  /**
   * @property htmlWebpackPlugin
   */
  public htmlWebpackPlugin: HtmlWebpackPlugin

  /**
   * @property replacements
   */
  public replacements: {[key: string]: RegExp}

  /**
   * @constructor
   * @constructs Webpack.Plugin
   */
  public constructor(
    htmlWebpackPlugin: HtmlWebpackPlugin,
    replacements: {[key: string]: RegExp},
  ) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.replacements = replacements
  }

  /**
   * @function apply
   * @see Webpack.Plugin['apply']
   */
  public apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(
      'InterpolateHtmlPlugin',
      (compilation: compilation.Compilation) => {
        /**
         * @todo fix hack any
         */
        ;(this.htmlWebpackPlugin as any)
          .getHooks(compilation)
          .afterTemplateExecution.tap(
            'InterpolateHtmlPlugin',
            data => {
              Object.keys(this.replacements).forEach(key => {
                data.html = data.html.replace(
                  new RegExp(`%${escapeString(key)}%`, 'g'),
                  this.replacements[key],
                )
              })
            },
          )
      },
    )
  }
}
