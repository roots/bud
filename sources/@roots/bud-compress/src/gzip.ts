import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Plugin from 'compression-webpack-plugin'

import type {Options} from './extension.js'

/**
 * Bud compression extension gzip adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 */
@label('@roots/bud-compress/gzip')
@plugin(Plugin)
@options({
  algorithm: 'brotliCompress',
  filename: '[name].br[query]',
  test: /\.js$|\.css$|\.html$|\.htm$/,
  compressionOptions: {level: 11},
  threshold: 10240,
  minRatio: 0.8,
  deleteOriginalAssets: false,
})
export default class BudGzip extends Extension<Options, Plugin> {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.api.bindFacade('gzip', this.config)
  }

  /**
   * `bud.gzip` fn
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async config(options: Options): Promise<Bud> {
    this.app.hooks.on('feature.gzip', true)

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
  public async when() {
    return this.app.hooks.filter('feature.gzip')
  }
}
