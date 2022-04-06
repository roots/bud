import type {Bud, Index} from '@roots/bud-framework'
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

  public bud?: () => Bud

  /**
   * Class constructor
   *
   * @param htmlWebpackPlugin - {@link HtmlWebpackPlugin}
   * @param replacements - {@link Index} of regular expressions
   *
   * @public
   */
  public constructor(
    public htmlWebpackPlugin: HtmlWebpackPlugin,
    public replacements: Index<RegExp>,
    bud?: Bud,
  ) {
    if (bud) {
      this.bud = () => bud
    }
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
        this.bud().dump(this.replacements, {
          prefix: 'template replacements',
          language: 'html',
          callToJSON: false,
        })
        this.bud().dump(data.html, {
          prefix: 'html data',
          language: 'html',
          callToJSON: false,
        })
        Object.entries(this.replacements).forEach(([key, value]) => {
          data.html = data.html.replaceAll(
            new RegExp(`%${key}%`, 'g'),
            value,
          )
        })

        this.bud().dump(data.html, {
          prefix: 'html with replacements',
          language: 'html',
          callToJSON: false,
          escapeString: false,
        })

        return data
      },
    )
  }
}
