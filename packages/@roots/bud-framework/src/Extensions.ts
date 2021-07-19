/**
 * @module @roots/bud-framework
 */

import type {Module, Service} from './'
import type {WebpackPluginInstance} from 'webpack/types'

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

export {Extensions}
