/**
 * ⚡️ Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * - 💁 Composable - Build boss web applications with a modular, configurable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {BudBrotliWebpackPlugin} from './BudBrotliWebpackPlugin'
import {BudCompressionExtension} from './BudCompressionExtension'
import {BudGzipWebpackPlugin} from './BudGzipWebpackPlugin'

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
    brotli(options?: BudCompressionExtension.Options): Framework

    /**
     * Gzip static assets.
     */
    gzip(options?: BudCompressionExtension.Options): Framework
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-compress': BudCompressionExtension
      'compression-webpack-plugin-brotli': BudBrotliWebpackPlugin
      'compression-webpack-plugin-gzip': BudGzipWebpackPlugin
    }
  }
}

export namespace BudCompressionExtension {
  export interface Options {
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

export const {name, boot} = BudCompressionExtension
