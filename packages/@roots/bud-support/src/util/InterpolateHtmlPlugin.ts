import escapeString from 'escape-string-regexp'
import type Webpack from 'webpack'

/**
 * @class InterpolateHtmlPlugin
 * @implements Tapable.Plugin
 */
export default class InterpolateHtmlPlugin {
  /**
   * @property name
   */
  public name: 'interpolate-html-plugin'

  /**
   * @property htmlWebpackPlugin
   * @todo fix this type definition @webpack5
   */
  public htmlWebpackPlugin: any

  /**
   * @property replacements
   */
  public replacements: {[key: string]: RegExp}

  /**
   * @constructor
   * @constructs Webpack.Plugin
   */
  public constructor(
    htmlWebpackPlugin: any,
    replacements: {[key: string]: RegExp},
  ) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.replacements = replacements
  }

  /**
   * @function apply
   * @see Webpack.Plugin['apply']
   */
  public apply(compiler: Webpack.Compiler): void {
    compiler.hooks.compilation.tap(
      'InterpolateHtmlPlugin',
      (compilation: Webpack.Compilation) => {
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
