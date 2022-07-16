import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

import Brotli from './brotli.js'
import Gzip from './gzip.js'

/**
 * Bud compression extension options
 *
 * @public
 */
export interface Options {
  filename: string
  algorithm: string
  test: RegExp
  compressionOptions: {
    [key: string]: any
  }
  threshold: number
  minRatio: number
  deleteOriginalAssets: boolean
}

/**
 * Bud compression extension
 *
 * @public
 * @decorator `@label`
 */
@label(`@roots/bud-compress`)
export default class BudCompressionExtension extends Extension<any, any> {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    await this.app.extensions.add([Brotli, Gzip])
  }
}
