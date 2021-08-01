/**
 * @module @roots/bud-framework
 */

import type {WebpackPluginInstance} from 'webpack'

import type {Module, Service} from './'

/**
 * @interface Extensions
 *
 * Extensions service
 */
interface Extensions extends Service {
  /**
   * Add an extension
   */
  add(extension: Module): void

  /**
   * Produce Webpack Plugins
   */
  make(): Extensions.PluginOutput[]
}

namespace Extensions {
  export type PluginOutput = WebpackPluginInstance[]
}

/**
 * @exports Extensions
 */
export {Extensions}
