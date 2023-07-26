// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Static asset compression extension
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

import type BudBrotli from '@roots/bud-compress/brotli'
import type BudCompress from '@roots/bud-compress/extension'
import type BudGzip from '@roots/bud-compress/gzip'
import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import BudCompressionExtension from './extension.js'

/**
 * Compression options
 */
interface Options {
  algorithm: string
  compressionOptions: Record<string, any>
  deleteOriginalAssets: boolean
  filename: string
  minRatio: number
  test: RegExp
  threshold: number
}

interface PublicBrotliAPI extends PublicExtensionApi<BudBrotli> {}
interface PublicGzipAPI extends PublicExtensionApi<BudGzip> {}
interface PublicCompressAPI extends PublicExtensionApi<BudCompress> {
  brotli: PublicBrotliAPI
  gzip: PublicGzipAPI
}

declare module '@roots/bud-framework' {
  interface Bud {
    brotli: PublicBrotliAPI
    compress: PublicCompressAPI
    gzip: PublicGzipAPI
  }

  interface Modules {
    '@roots/bud-compress': PublicCompressAPI
    '@roots/bud-compress/brotli': PublicBrotliAPI
    '@roots/bud-compress/gzip': PublicGzipAPI
  }
}

export default BudCompressionExtension
export type {Options}
