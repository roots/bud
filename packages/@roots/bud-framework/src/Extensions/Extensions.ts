import {Service} from '../Service'
import {WebpackPluginInstance} from 'webpack/types'
import {Module} from './Module'

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
