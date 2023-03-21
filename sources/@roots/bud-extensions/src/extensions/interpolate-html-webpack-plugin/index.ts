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
 * Interpolate html webpack plugin configuration
 */
@label(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
@options<Options>({})
@disabled
export default class BudInterpolateHtmlExtension extends Extension<
  Options,
  InterpolateHtmlWebpackPlugin
> {
  /**
   * {@link Extension.make}
   */
  @bind
  public override async make(bud: Bud) {
    const {InterpolateHtmlWebpackPlugin} = await bud.module.import(
      `@roots/bud-extensions/interpolate-html-webpack-plugin/plugin`,
      import.meta.url,
    )

    const HTMLWebpackPlugin = await bud.module.import(
      `@roots/bud-support/html-webpack-plugin`,
      import.meta.url,
    )

    return new InterpolateHtmlWebpackPlugin(
      HTMLWebpackPlugin.Plugin.getHooks,
      {
        ...(bud.extensions.get(
          `@roots/bud-extensions/webpack-define-plugin`,
        )?.options ?? {}),
        ...(bud.env.getPublicEnv() ?? {}),
        ...(this.options ?? {}),
      },
    )
  }
}
