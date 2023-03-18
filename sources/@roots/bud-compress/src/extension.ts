import type {Bud} from '@roots/bud-framework'
import type {Modules} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Compression options
 */
export interface Options {
  filename: string
  algorithm: string
  test: RegExp
  compressionOptions: Record<string, any>
  threshold: number
  minRatio: number
  deleteOriginalAssets: boolean
}

/**
 * Compress static assets
 *
 * @example
 * ```js
 * bud.compress.gzip
 *  .enable()
 *  .set('filename', '[name].gz[query]')
 *
 * bud.compress.brotli
 *  .enable()
 *  .set('filename', '[name].br[query]')
 * ```
 */
@label(`@roots/bud-compress`)
@dependsOn([`@roots/bud-compress/brotli`, `@roots/bud-compress/gzip`])
export default class BudCompressionExtension extends Extension<any, any> {
  public declare gzip: Modules[`@roots/bud-compress/gzip`]
  public declare brotli: Modules[`@roots/bud-compress/brotli`]

  @bind
  public override async register(bud: Bud) {
    this.gzip = bud.extensions.get(`@roots/bud-compress/gzip`)
    this.brotli = bud.extensions.get(`@roots/bud-compress/brotli`)
  }
}
