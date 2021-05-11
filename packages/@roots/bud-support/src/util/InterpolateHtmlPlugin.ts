import Webpack from 'webpack'
import escapeString from 'escape-string-regexp'

export default class InterpolateHtmlPlugin {
  public name = 'interpolate-html-plugin'

  public htmlWebpackPlugin: any

  public replacements: {[key: string]: RegExp}

  public constructor(
    htmlWebpackPlugin: any,
    replacements: {[key: string]: RegExp},
  ) {
    this.htmlWebpackPlugin = htmlWebpackPlugin
    this.replacements = replacements
  }

  public apply(compiler: Webpack.Compiler): void {
    compiler.hooks.compilation.tap(
      'InterpolateHtmlPlugin',
      (compilation: any) => {
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
