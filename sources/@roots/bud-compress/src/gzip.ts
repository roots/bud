import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
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
 * Gzip compression configuration
 */
@label(`@roots/bud-compress/gzip`)
@plugin(Plugin)
@options({
  algorithm: `brotliCompress`,
  filename: `[name].br[query]`,
  test: /\.js$|\.css$|\.html$|\.htm$/,
  compressionOptions: {level: 11},
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
})
@disabled
export default class BudGzip extends Extension<Options, Plugin> {
  /**
   * `register` callback
   */
  @bind
  public override async register(bud: Bud) {
    bud.api.bindFacade(`gzip`, this.config)
  }

  /**
   * @deprecated Use `bud.compress.gzip.setOptions()` instead.
   */
  @deprecated(
    `bud.compress.gzip.config`,
    `Use bud.compress.gzip.set instead`,
    [
      [
        `set deleteOriginalAssets`,
        `bud.compress.gzip.set('deleteOriginalAssets', true)`,
      ],
    ],
  )
  public async config(options?: Options): Promise<Bud> {
    this.enable()
    options && this.setOptions(options)
    return this.app
  }
}
