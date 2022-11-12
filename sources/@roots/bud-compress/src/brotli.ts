import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'compression-webpack-plugin'

import type {Options} from './extension.js'

/**
 * Bud compression extension brotli adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 */
@label(`@roots/bud-compress/brotli`)
@plugin(Plugin)
@options<Options>({
  algorithm: `brotliCompress`,
  filename: `[name].br[query]`,
  test: /\.js$|\.css$|\.html$|\.htm$/,
  compressionOptions: {level: 11},
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
})
export default class BudBrotli extends Extension<Options, Plugin> {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(bud: Bud) {
    bud.api.bindFacade(`brotli`, this.config)
  }

  /**
   * `bud.brotli` fn
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async config(options: Options): Promise<Bud> {
    this.app.hooks.on(`feature.brotli`, true)

    options && this.setOptions(options)

    return this.app
  }

  /**
   * `when` callback
   *
   * @returns true when `feature.brotli` is true
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async when(bud: Bud) {
    return bud.hooks.filter(`feature.brotli`)
  }
}
