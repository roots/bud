import escapeStringRegexp from 'escape-string-regexp'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import type {Compiler, compilation} from 'webpack'

/**
 * Interpolate HTML Plugin
 */
export default class InterpolateHtmlPlugin {
  /**
   * HTML Webpack Plugin
   */
  htmlWebpackPlugin: HtmlWebpackPlugin

  /**
   * Replacements
   */
  replacements: {[key: string]: RegExp}

  constructor(
    htmlWebpackPlugin: HtmlWebpackPlugin,
    replacements: {[key: string]: RegExp},
  ) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.replacements = replacements
  }

  apply(compiler: Compiler): void {
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
              // Run HTML through a series of user-specified string replacements.
              Object.keys(this.replacements).forEach(key => {
                const value = this.replacements[key]
                data.html = data.html.replace(
                  new RegExp(
                    '%' + escapeStringRegexp(key) + '%',
                    'g',
                  ),
                  value,
                )
              })
            },
          )
      },
    )
  }
}
