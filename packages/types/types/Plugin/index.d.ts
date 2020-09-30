// Type definitions for Plugin
// Project: @roots/bud
// Definitions by: Kelly Mears <kelly@roots.io>

import Bud from '..'
import Webpack from 'webpack'

export default Plugin

/**
 * Plugin interface
 *
 * Plugins are passed a single parameter -- the Bud object after all configuration
 * is complete, during the build phase just prior to compilation.
 *
 * They are required to have a single member function -- `make`. Bud extensions which
 * add webpack plugins to the compiler can return the instantiated plugin from the
 * make function for registration.
 *
 * Extensions which return `false` from `when` will not have their `make` method called.
 */
declare type Plugin = {
  /**
   * Framework
   */
  bud: Bud

  /**
   * Plugin options.
   */
  options?: Bud.Plugin.Options

  /**
   * Set plugin options
   */
  setOptions?: Bud.Plugin.Options

  /**
   * Merge plugin options
   */
  mergeOptions?: Bud.Plugin.Options

  /**
   * Primary action of plugin.
   */
  make: () => Webpack.Plugin

  /**
   * Whether or not to call `make`.
   */
  when?: Bud.Plugin.Conditional
}
