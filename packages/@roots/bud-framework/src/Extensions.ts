/**
 * @module @roots/bud-framework
 */

import type {WebpackPluginInstance} from 'webpack'

import type {Framework, Module, Plugin, Service} from './'

/**
 * Container service for {@link Framework} extensions.
 *
 * @remarks
 * Extensions can be defined as a {@link Module}, which is more generic.
 * They can also be defined as a {@link Plugin} which is a {@link Module}
 * specifically providing a {@link WebpackPluginInstance}.
 *
 * @public
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

/**
 * @exports Extensions
 */
export {Extensions}
