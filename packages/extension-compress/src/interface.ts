import '@roots/bud'

import Plugin from 'compression-webpack-plugin'

declare module '@roots/bud' {
  interface Bud {
    /**
     * ## bud.brotli  [💁 Fluent]
     *
     * Compress static assets with brotli compression.
     *
     * It's arguments are optional. For more information on
     * configuration consult [the compression webpack
     * plugin documentation](#).
     *
     * [🔗 Documentation](#)
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
    brotli: Bud.Compress.Brotli.Config

    /**
     * ## bud.gzip  [💁 Fluent]
     *
     * Gzip static assets. [🔗 Documentation](#)
     */
    gzip: Bud.Compress.Gzip.Config
  }

  export namespace Bud.Compress {
    export namespace Brotli {
      export type Options = Bud.Module.Options<any>

      export type Make = Bud.Module.Make<Plugin, Options>

      export type When = Bud.Module.When

      export type Config = (this: Bud, options?: any) => Bud
    }

    export namespace Gzip {
      export type Options = Bud.Module.Options<any>

      export type Make = Bud.Module.Make<Plugin, Options>

      export type When = Bud.Module.When

      export type Config = (this: Bud, options?: any) => Bud
    }
  }
}
