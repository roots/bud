import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type BudBrotli from './brotli.js'
import type BudCompress from './extension.js'
import type BudGzip from './gzip.js'

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
