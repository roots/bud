// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * `@roots/entrypoints-webpack-plugin`
 */

import type {SyncHook, SyncWaterfallHook} from 'tapable'
import type {Compilation} from 'webpack'

export interface CompilationHooks {
  compilation: SyncHook<Compilation>
  entrypoints: SyncWaterfallHook<Entrypoints>
}

/**
 * Entrypoints
 */
export type Entrypoints = Map<string, Map<string, Set<string>>>

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
} from '@roots/entrypoints-webpack-plugin/plugin'
