import '@roots/bud'
import {Module} from '@roots/bud-typings'
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
    brotli: Framework.Compress.Brotli.Config

    /**
     * ## gzip  [💁 Fluent]
     *
     * Gzip static assets.
     */
    gzip: Framework.Compress.Gzip.Config
  }

  export namespace Framework.Compress {
    export namespace Brotli {
      export type Options = Module.Options<any>

      export type Make = Module.Make<Plugin, Options>

      export type When = Module.When

      export type Config = (options?: any) => Framework
    }

    export namespace Gzip {
      export type Options = Module.Options<any>

      export type Make = Module.Make<Plugin, Options>

      export type When = Module.When

      export type Config = (options?: any) => Framework
    }
  }
}
