// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * `@roots/entrypoints-webpack-plugin`
 */

import type {SyncHook, SyncWaterfallHook} from 'tapable'

export interface CompilationHooks {
  compilation: SyncHook<Record<string, any>>
  entrypoints: SyncWaterfallHook<Record<string, any>>
}

/**
 * Entrypoints
 */
export interface Entrypoints extends Record<string, unknown> {
  [entry: string]: any
}

/**
 * EntrypointsWebpackPlugin options
 */
export interface Options {
  /**
   * Emit html with inlined runtime, script and style tags
   */
  emitHtml?: boolean

  /**
   * Name of the file to emit (default: `entrypoints.json`)
   */
  name?: string

  /**
   * Path to emit entrypoints.json
   */
  outputPath?: string

  /**
   * Override the public path (default is from webpack)
   */
  publicPath?: string

  /**
   * Emit entrypoints as an array or an object (default: `array`)
   */
  type?: 'array' | 'object'
}

export {
  EntrypointsWebpackPlugin,
  EntrypointsWebpackPlugin as default,
} from './webpack.plugin.js'
