import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  disabled,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import type {Options, Plugin} from '@roots/bud-support/html-webpack-plugin'
import Value from '@roots/bud-support/value'

export type {Options}

/**
 * HTML Webpack plugin configuration
 */
@label(`@roots/bud-extensions/html-webpack-plugin`)
@options<Options>({
  filename: `index.html`,
  inject: true,
  template: `auto`,
  publicPath: Value.make(app => app.publicPath()),
})
@disabled
export default class BudHtmlWebpackPlugin extends Extension<
  Options,
  Plugin
> {
  /**
   * {@link Extension.make}
   */
  public override async make(bud: Bud, options: Options) {
    const {Plugin} = await bud.module.import(
      `@roots/bud-support/html-webpack-plugin`,
      import.meta.url,
    )

    return new Plugin(options)
  }
}
