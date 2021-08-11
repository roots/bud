import {Framework, Module} from '@roots/bud-framework'
import type * as Webpack from 'webpack'

import {HtmlWebpackPlugin} from './HtmlWebpackPlugin'

interface RegularExpressionIndex {
  [key: string]: RegExp
}

class InterpolateHtmlPlugin {
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

const extension: Module<
  InterpolateHtmlPlugin,
  {[key: string]: RegExp}
> = {
  name: 'interpolate-html-plugin',

  options: app => {
    const env = Object.fromEntries(
      app.env
        .getEntries()
        .filter(([k]) => k.includes('APP_')) as Array<
        [string, RegExp]
      >,
    )

    const store =
      app.store.get('extension.interpolateHtmlPlugin.replace') ??
      {}

    return {
      ...env,
      ...store,
    }
  },

  make: options =>
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, options.all()),

  when: (_app: Framework, options: Module.Options) =>
    options.getEntries().length > 0,
}

export const {name, options, make, when} = extension
