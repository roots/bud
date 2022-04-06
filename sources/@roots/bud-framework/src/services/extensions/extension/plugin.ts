import {Signale} from '@roots/bud-support'
import {Container} from '@roots/container'

import {Bud, Maybe} from '../../..'
import {Module} from './module'

/**
 * Apply plugin interface
 *
 * @remarks
 * Compatible with Webpack's plugin interface
 *
 * @public
 */
export interface Plugin<
  Plugin = any,
  Options = Record<string, any>,
> extends Module {
  /**
   * Either a function returning a finalized {@link ApplyPlugin} or a literal {@link ApplyPlugin}.
   *
   * @remarks
   * If a factory is implemented, it will be passed a {@link Container} instance holding
   * the {@link Module.options} (if any) as well as the {@link Bud} instance.
   *
   * @public
   */
  make?: Maybe<[Container<Options>, Bud, Signale], Plugin>

  /**
   * Compiler plugin `apply` method
   *
   * @remarks
   * This function makes the {@link @roots/bud-Bud#Extension.Module} interoperable with
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
