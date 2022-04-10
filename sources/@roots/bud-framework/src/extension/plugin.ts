import {Signale} from '@roots/bud-support'
import {Container} from '@roots/container'

import {Bud} from '..'
import {Module} from './module'

/**
 * Plugin interface
 *
 * @remarks
 * Compatible with Webpack's plugin interface
 *
 * @public
 */
export interface Plugin<Type = any, Options = Record<string, any>>
  extends Module<Options> {
  /**
   * Either a function returning a plugin value or the plugin value itself.
   *
   * @public
   */
  make?:
    | Type & PluginInstance
    | ((options: Container<Options>, app: Bud, logger: Signale) => Type & PluginInstance)

  /**
   * Compiler plugin `apply` method
   *
   * @public
   */
  apply?: Type & PluginInstance['apply']
}

/**
 * Compiler plugin interface
 * 
 * @public
 */
export interface PluginInstance {
  [key: string]: any

  /**
   * Apply method
   *
   * @public
   */
  apply: CallableFunction
}
