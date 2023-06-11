import type {Bud} from '@roots/bud-framework'
import type {Options} from '@roots/bud-support/html-webpack-plugin'

import {
  type ApplyPlugin,
  DynamicOption,
  Extension,
} from '@roots/bud-framework/extension'
import {
  disabled,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

/**
 * HTML Webpack plugin configuration
 */
@label(`@roots/bud-extensions/html-webpack-plugin`)
@options({
  filename: `index.html`,
  inject: true,
  publicPath: DynamicOption.make(app => app.publicPath()),
  template: `auto`,
})
@disabled
class BudHtmlWebpackPlugin extends Extension<Options, ApplyPlugin> {
  /**
   * {@link Extension.make}
   */
  public override async make(bud: Bud, options: Options) {
    const Plugin = await bud.module.import(
      `@roots/bud-support/html-webpack-plugin`,
      import.meta.url,
    )

    return new Plugin(options)
  }
}

export {BudHtmlWebpackPlugin as default}
export type {Options}
