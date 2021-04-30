import '@roots/bud-extensions'

import Plugin from 'compression-webpack-plugin'

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
    brotli: Compress.ConfigFn

    /**
     * ## gzip  [💁 Fluent]
     *
     * Gzip static assets.
     */
    gzip: Compress.ConfigFn
  }

  namespace Compress {
    type ConfigFn = (options?: Options) => Framework

    interface Extension extends Module<Plugin, Options> {
      name: keyof Hooks.Extension.Definitions
      options: Module.Options<Options>
      make: Module.Make<Plugin, Module.Options>
      when: Module.When
      api: {
        [key: string]: Compress.ConfigFn
      }
    }

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
  }

  namespace Hooks.Extension {
    interface Definitions {
      '@roots/bud-compress': Module
      'compression-webpack-plugin-brotli': Compress.Extension
      'compression-webpack-plugin-gzip': Compress.Extension
    }
  }
}
