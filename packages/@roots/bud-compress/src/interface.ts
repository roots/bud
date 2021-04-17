import {Module} from '@roots/bud-framework'

import CompressionPlugin from 'compression-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## brotli  [💁 Fluent]
     *
     * Compress static assets with brotli compression.
     *
     * It's arguments are optional. For more information on
     * configuration consult [the compression webpack
     * plugin documentation](#).
     *
     * ### Usage
     *
     * **Simplest way to get started is to just call it**
     *
     * This is likely a fine default config.
     *
     * ```js
     * bud.brotli()
     * ```
     *
     * #### Shown with default options
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
    brotli: Compress.Config

    /**
     * ## gzip  [💁 Fluent]
     *
     * Gzip static assets.
     */
    gzip: Compress.Config
  }

  namespace Compress {
    type Config = (options?: any) => Framework
    interface Extension extends Module {
      options: Module.Options<any>
      make: Module.Make<CompressionPlugin, Module.Options>
      when: Module.When
      config: Config
    }
  }

  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-compress': Module
      'compression-webpack-plugin-brotli': Compress.Extension
      'compression-webpack-plugin-gzip': Compress.Extension
    }
  }
}
