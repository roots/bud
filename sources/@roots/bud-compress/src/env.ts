import '@roots/bud-framework/lib/registry'

import type BudBrotliWebpackPlugin from './brotli.js'
import type BudCompressionExtension from './extension.js'
import type {Options} from './extension.js'
import type BudGzipWebpackPlugin from './gzip.js'

declare module '@roots/bud-framework/lib/registry' {
  interface Flags {
    'feature.gzip': boolean
    'feature.brotli': boolean
  }
}

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-compress': BudCompressionExtension
    '@roots/bud-compress/brotli': BudBrotliWebpackPlugin
    '@roots/bud-compress/gzip': BudGzipWebpackPlugin
  }

  interface Bud {
    /**
     * Compress static assets with brotli compression.
     *
     * @remarks
     * It's arguments are optional. For more information on
     * configuration consult [the compression webpack
     * plugin documentation](#).
     *
     * @example
     * This is likely a fine default config.
     *
     * ```js
     * bud.brotli()
     * ```
     *
     * @example
     * With default options:
     *
     * ```js
     * bud.brotli({
     *   filename: '[name].br[query]',
     *   algorithm: 'brotliCompress',
     *   test: /\.js$|\.css$|\.html$|\.html$/,
     *   compressionOptions: {
     *     level: 11,
     *   },
     *   threshold: 10240,
     *   minRatio: 0.8,
     *   deleteOriginalAssets: false,
     * })
     * ```
     *
     * @public
     */
    brotli(options?: Options): Bud

    /**
     * Gzip static assets.
     *
     * @public
     */
    gzip(options?: Options): Bud
  }
}
