import * as Webpack from 'webpack'

interface RegularExpressionIndex {
  [key: string]: RegExp
}

class InterpolateHtmlPlugin {
  /**
   * @property {string} name
   */
  public name = 'interpolate-html-plugin'

  /**
   * @property {Webpack.WebpackPluginInstance} htmlWebpackPlugin
   */
  public htmlWebpackPlugin: Webpack.WebpackPluginInstance

  /**
   * @property {RegularExpressionIndex} replacements
   */
  public replacements: RegularExpressionIndex

  /**
   * @constructor
   */
  public constructor(
    htmlWebpackPlugin: Webpack.WebpackPluginInstance,
    replacements: RegularExpressionIndex,
  ) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.replacements = replacements
  }

  /**
   * @function escapeRegExp
   */
  public escapeRegExp(string: String) {
    return string
      .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      .replace(/-/g, '\\x2d')
  }

  /**
   * @function apply
   * @implements Webpack.WebpackPluginInstance['apply']
   */
  public apply(compiler: Webpack.Compiler): void {
    /**
     * @function modifyHtmlWebpackPluginOptions
     */
    const modifyHtmlWebpackPluginOptions = (
      compilation: any,
    ) => {
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

    compiler.hooks.compilation.tap(
      'InterpolateHtmlPlugin',
      modifyHtmlWebpackPluginOptions,
    )
  }
}

export {InterpolateHtmlPlugin}
