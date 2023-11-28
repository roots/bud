import type {Bud} from '@roots/bud-framework'
import type {Options} from '@roots/bud-support/html-webpack-plugin'

import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

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
  template: resolve(
    dirname(fileURLToPath(import.meta.url)),
    `..`,
    `..`,
    `vendor`,
    `template.html`,
  ),
})
@disabled
class BudHtmlWebpackPlugin extends Extension<Options, ApplyPlugin> {
  public get interpolatePlugin() {
    return this.app.extensions.get(
      `@roots/bud-extensions/interpolate-html-webpack-plugin`,
    )
  }

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
