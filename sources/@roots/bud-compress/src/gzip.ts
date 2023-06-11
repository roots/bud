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
  compressionOptions: {level: 11},
  deleteOriginalAssets: false,
  filename: `[name].br[query]`,
  minRatio: 0.8,
  test: /\.js$|\.css$|\.html$|\.htm$/,
  threshold: 10240,
})
@disabled
export default class BudGzip extends Extension<Options, Plugin> {
  /**
   * @deprecated Use `bud.compress.gzip.setOptions()` instead.
   */
  @deprecated(`bud.compress.gzip`, `Use bud.compress.gzip.set instead`, [
    [
      `set deleteOriginalAssets`,
      `bud.compress.gzip.set('deleteOriginalAssets', true)`,
    ],
  ])
  public async config(options?: Options): Promise<Bud> {
    this.enable()
    options && this.setOptions(options)
    return this.app
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    bud.api.bindFacade(`gzip`, this.config.bind(this))
  }
}

export type {Options}
