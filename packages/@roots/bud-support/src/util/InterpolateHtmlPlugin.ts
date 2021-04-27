import Webpack from 'webpack'
import escapeString from 'escape-string-regexp'

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
      (compilation: any) => {
        /**
         * @todo fix hack any
         */
        this.htmlWebpackPlugin
          .getHooks(compilation)
          .afterTemplateExecution.tap(
            'InterpolateHtmlPlugin',
            data => {
              Object.entries(this.replacements).forEach(
                ([key, value]) => {
                  data.html = data.html.replace(
                    new RegExp(`%${escapeString(key)}%`, 'g'),
                    value,
                  )
                },
              )
            },
          )
      },
    )
  }
}
