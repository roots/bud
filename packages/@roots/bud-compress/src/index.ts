// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Static asset compression extension
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
    brotli(options?: BudCompressionExtension.Options): Framework

    /**
     * Gzip static assets.
     *
     * @public
     */
    gzip(options?: BudCompressionExtension.Options): Framework
  }

  interface Modules {
    '@roots/bud-compress': BudCompressionExtension
  }

  interface Plugins {
    'compression-webpack-plugin-brotli': BudBrotliWebpackPlugin
    'compression-webpack-plugin-gzip': BudGzipWebpackPlugin
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
