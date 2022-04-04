import {Signale} from '@roots/bud-support'
import {Container} from '@roots/container'

import {Framework} from '../..'
import {Module} from './module.interface'

/**
 * Apply plugin interface
 *
 * @remarks
 * Compatible with Webpack's plugin interface
 *
 * @public
 */
export interface CompilerPlugin<
  Plugin = any,
  Options = Record<string, any>,
> extends Module {
  /**
   * Either a function returning a finalized {@link ApplyPlugin} or a literal {@link ApplyPlugin}.
   *
   * @remarks
   * If a factory is implemented, it will be passed a {@link Container} instance holding
   * the {@link Module.options} (if any) as well as the {@link Framework} instance.
   *
   * @public
   */
  make?: | Plugin | ((options: Container<Options>, app: Framework, logger: Signale) => Plugin)

  /**
   * Compiler plugin `apply` method
   *
   * @remarks
   * This function makes the {@link @roots/bud-framework#Extension.Module} interoperable with
   * the Webpack plugin interface
   *
   * @public
   */
  apply?: CallableFunction
}
