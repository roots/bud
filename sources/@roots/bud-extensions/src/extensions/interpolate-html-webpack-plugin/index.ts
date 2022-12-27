import type {
  InterpolateHtmlWebpackPlugin,
  Options,
} from '@roots/bud-extensions/interpolate-html-webpack-plugin/plugin'
import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

export type {Options}

/**
 * BudInterpolateHTMLPlugin
 *
 * @public
 * @decorator `@label`
 */
@label(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
@options<Options>({})
@disabled
export default class BudInterpolateHtmlExtension extends Extension<
  Options,
  InterpolateHtmlWebpackPlugin
> {
  /**
   * `make` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async make(bud: Bud) {
    const {InterpolateHtmlWebpackPlugin} = await bud.module.import(
      `@roots/bud-extensions/interpolate-html-webpack-plugin/plugin`,
    )

    const HTMLWebpackPlugin = await bud.module.import(
      `@roots/bud-support/html-webpack-plugin`,
    )

    return new InterpolateHtmlWebpackPlugin(
      HTMLWebpackPlugin.Plugin.getHooks,
      this.options,
    )
  }
}
