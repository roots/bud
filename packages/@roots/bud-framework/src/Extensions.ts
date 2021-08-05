import type {WebpackPluginInstance} from 'webpack'

import type {Framework, Module, Plugin, Service} from './'

/**
 * @noInherit
 */
interface Extensions extends Service<Framework.Extensions> {
  /**
   * Add an extension
   */
  add(extension: Module | Plugin): void

  /**
   * Get {@link WebpackPluginInstance} instances to be included in compilation
   */
  make(): Extensions.PluginOutput[]

  /**
   * Get {@link Extension} instances slated for inclusion in compilation
   */
  getEligibleWebpackModules(): (Module | Plugin)[]
}

namespace Extensions {
  export type PluginOutput = WebpackPluginInstance[]
}

export {Extensions}
