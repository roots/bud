import {Module, WebpackPlugin} from '@roots/bud-framework'
import CompressionPlugin from 'compression-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Compress static assets with brotli compression.
     *
     * @remarks
     * It's arguments are optional. For more information on
     * configuration consult [the compression webpack
     * plugin documentation](#).
     *
     * @usage
     * **Simplest way to get started is to just call it**
     *
     * This is likely a fine default config.
     *
     * ```js
     * bud.brotli()
     * ```
     *
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
     */
    brotli: Framework.Compress.ConfigFn

    /**
     * ## gzip  [💁 Fluent]
     *
     * Gzip static assets.
     */
    gzip: Framework.Compress.ConfigFn
  }

  namespace Framework {
    namespace Compress {
      type ConfigFn = (options?: Options) => Framework

      interface Options {
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

      type Extension = WebpackPlugin<CompressionPlugin, Options>
    }
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-compress': Module
      'compression-webpack-plugin-brotli': Compress.Extension
      'compression-webpack-plugin-gzip': Compress.Extension
    }
  }
}
