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
  template: undefined,
})
@disabled
class BudHtmlWebpackPlugin extends Extension<Options, ApplyPlugin> {
  /**
   * {@link Extension.configAfter}
   */
  public override async configAfter(bud: Bud) {
    if (bud.context.html) {
      this.enabled = true
      bud.extensions
        .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
        .enable()
    }

    if (bud.context.html === false) {
      this.enabled = false
      bud.extensions
        .get(`@roots/bud-extensions/interpolate-html-webpack-plugin`)
        .enable(false)
      return bud
    }

    if (typeof bud.context.html === `string`) {
      this.set(`template`, bud.path(bud.context.html))
    }

    if (!this.options.template) {
      this.set(
        `template`,
        resolve(
          dirname(fileURLToPath(import.meta.url)),
          `..`,
          `..`,
          `vendor`,
          `template.html`,
        ),
      )
    }
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
