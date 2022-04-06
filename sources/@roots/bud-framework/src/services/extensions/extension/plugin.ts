import {Signale} from '@roots/bud-support'
import {Container} from '@roots/container'

import {Bud} from '../../..'
import {Module} from './module'

/**
 * Apply plugin interface
 *
 * @remarks
 * Compatible with Webpack's plugin interface
 *
 * @public
 */
export interface Plugin<Plugin = any, Options = Record<string, any>>
  extends Module {
  /**
   * Either a function returning a plugin 
   * value or the plugin value itself.
   *
   * @remarks
   * If a factory is implemented, it will be passed a {@link Container} instance holding
   * the {@link Module.options} (if any) as well as the {@link Bud} instance.
   *
   * @public
   */
  make?:
    | Plugin
    | ((
        options: Container<Options>,
        app: Bud,
        logger: Signale,
      ) => Plugin)

  /**
   * Compiler plugin `apply` method
   *
   * @remarks
   * This function makes the {@link @roots/bud#Extension.Module} interoperable with
   * the Webpack plugin interface
   *
   * @public
   */
  apply?: CallableFunction
}

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
