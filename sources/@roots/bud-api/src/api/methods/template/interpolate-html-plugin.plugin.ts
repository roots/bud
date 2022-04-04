import type {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import type {Compilation, Compiler} from 'webpack'

import {HtmlWebpackPlugin} from './html-webpack-plugin.plugin'

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
   * Class constructor
   *
   * @param htmlWebpackPlugin - {@link HtmlWebpackPlugin}
   * @param replacements - Regular expression records
   *
   * @public
   */
  public constructor(
    public htmlWebpackPlugin: HtmlWebpackPlugin,
    public replacements:Record<string, RegExp>,
  ) {
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
  public modifyHtmlWebpackPluginOptions(compilation: Compilation): void {
    HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tap(
      'InterpolateHtmlPlugin',
      (data: any) => {
        Object.entries(this.replacements).forEach(([key, value]) => {
          data.html = data.html.replaceAll(
            new RegExp(`%${key}%`, 'g'),
            value,
          )
        })
        
        return data
      },
    )
  }
}
