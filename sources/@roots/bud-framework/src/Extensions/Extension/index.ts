/**
 * Compiler plugin instance
 *
 * @remarks
 * Compatible with the webpack plugin interface.
 *
 * @public
 */
export interface PluginInstance {
  /**
   * Apply method
   *
   * @public
   */
  apply: CallableFunction
}

export {CompilerPlugin} from './compiler-plugin.interface'
export {Module} from './module.interface'
