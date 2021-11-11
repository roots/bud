import {Container} from '@roots/container'
import {Signale} from 'signale'

import {Framework, Maybe, Modules, Plugins} from '../..'
import {Module} from './Module'

/**
 * Registered extension names
 *
 * @remarks
 * Extension names can be declared by overloading
 * the {@link Modules} and {@link Plugins} interfaces
 *
 * @public
 */
export type Name = `${
  | (keyof Modules & string)
  | (keyof Plugins & string)}`

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
  make?: Maybe<[Container<Options>, Framework, Signale], Plugin>

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

export {Module}
