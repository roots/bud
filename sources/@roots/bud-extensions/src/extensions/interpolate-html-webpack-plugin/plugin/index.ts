import {bind} from '@roots/bud-support/decorators'
import type {Plugin} from '@roots/bud-support/html-webpack-plugin'
import type {
  Compiler,
  WebpackPluginInstance,
} from '@roots/bud-support/webpack'

export interface Options {
  [key: string]: RegExp | string
}

/**
 * Template variable interpolation plugin for webpack
 */
export class InterpolateHtmlWebpackPlugin {
  /**
   * Plugin name
   */
  public name = `interpolate-html-webpack-plugin`

  /**
   * Class constructor
   */
  public constructor(
    public getHooks: (...args: any[]) => Plugin.Hooks,
    public replacements: Options,
  ) {}

  /**
   * {@link WebpackPluginInstance.apply}
   */
  @bind
  public apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(`InterpolateHtmlPlugin`, compilation =>
      this.getHooks(compilation).afterTemplateExecution.tap(
        `interpolate-html-plugin`,
        (data: any) => {
          if (
            !this.replacements ||
            Object.keys(this.replacements).length === 0
          )
            return data

          Object.entries(this.replacements).forEach(([key, value]) => {
            data.html = data.html
              .replaceAll(new RegExp(`{{${key}}}`, `g`), value)
              .replaceAll(new RegExp(`%${key}%`, `g`), value)
          })

          return data
        },
      ),
    )
  }
}
