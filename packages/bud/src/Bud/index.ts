import {Framework} from '@roots/bud-framework'
import type {Brotli} from '../extensions'

/**
 * ## Bud
 *
 * A webpack framework combining the best parts of
 * Laravel Mix and Symfony Encore.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](https://github.io/roots/bud)
 * [📦 @roots/bud](https://github.io/roots/bud)
 * [🔗 Documentation](#)
 */
export default class extends Framework {
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
   * **Simplest way to get started is to just call it** This is likely fine.
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
  public brotli: Brotli.Config
}
