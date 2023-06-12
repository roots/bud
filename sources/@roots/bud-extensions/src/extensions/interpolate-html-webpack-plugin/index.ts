import type {Bud} from '@roots/bud-framework'

import {
  default as InterpolateHtmlWebpackPlugin,
  type Options,
} from '@roots/bud-extensions/interpolate-html-webpack-plugin/plugin'
import {DynamicOption, Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

/**
 * Interpolate html webpack plugin configuration
 */
@label(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
@options<Options>({
  APP_TITLE: DynamicOption.make(app => app.label),
  NO_SCRIPT: `You need to enable JavaScript to run this app`,
})
@disabled
class BudInterpolateHtmlExtension extends Extension<
  Options,
  InterpolateHtmlWebpackPlugin
> {
  /**
   * {@link Extension.make}
   */
  @bind
  public override async make(bud: Bud) {
    const InterpolateHtmlWebpackPlugin = await bud.module.import(
      `@roots/bud-extensions/interpolate-html-webpack-plugin/plugin`,
      import.meta.url,
    )

    const {getHooks} = await bud.module.import(
      `@roots/bud-support/html-webpack-plugin`,
      import.meta.url,
    )

    return new InterpolateHtmlWebpackPlugin(getHooks, {
      ...(this.options ?? {}),
      ...(bud.extensions.get(`@roots/bud-extensions/webpack-define-plugin`)
        ?.options ?? {}),
      ...(bud.env.getPublicEnv() ?? {}),
    })
  }
}

export type {Options}
export {BudInterpolateHtmlExtension as default}
