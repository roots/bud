import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  disabled,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import Plugin from 'compression-webpack-plugin'

import type {Options} from './extension.js'

/**
 * Brotli compression configuration
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
@disabled
export default class BudBrotli extends Extension<Options, Plugin> {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    bud.api.bindFacade(`brotli`, this.config)
  }

  /**
   * @deprecated Use `bud.compress.brotli.setOptions()` instead.
   */
  @bind
  @deprecated(
    `bud.compress.brotli.config`,
    `Use bud.compress.brotli.set instead`,
    [
      [
        `set deleteOriginalAssets`,
        `bud.compress.brotli.set('deleteOriginalAssets', true)`,
      ],
    ],
  )
  public async config(options?: Options): Promise<Bud> {
    this.enable()
    options && this.setOptions(options)
    return this.app
  }
}

export type {Options}
