import {Signale} from '@roots/bud-support'
import {Container} from '@roots/container'

import {Bud, Factory, Modules, Plugins} from '../../..'

/**
 * Bud extension interface
 *
 * @typeParam Options - Extension options
 *
 * @public
 */
export interface Module<Options = any> extends Record<string, any> {
  /**
   * The module name
   *
   * @public
   */
  name?: `${(keyof Modules & string) | (keyof Plugins & string)}`

  /**
   * Options registered to the extension module
   *
   * @public
   */
  options?: Options | ((app: Bud) => Options)

  /**
   * General purpose callback. Called first.
   *
   * @public
   */
  register?: Factory<[Bud, Signale], any>

  /**
   * General purpose callback. Called after everything else.
   *
   * @public
   */
  boot?: Factory<[Bud, Signale], any>

  /**
   * Objects to bind to the Bud. May be expressed as an object literal or a factory function.
   *
   * @remarks
   * You might also use {@link @roots/bud-Bud#Service.bindMethod | bindMethod} to accomplish the same thing.
   *
   * If expressed as a factory function, the function will be called with the {@link Bud} as the first parameter.
   *
   * @public
   */
  api?:
    | ((app: Bud) => Promise<Record<string, CallableFunction>>)
    | Record<string, CallableFunction>

  /**
   * Objects to bind to the Bud. May be expressed as an object literal or a factory function.
   *
   * @remarks
   * You might also use {@link @roots/bud-Bud#Service.bindClass | bindClass} to accomplish the same thing.
   *
   * If expressed as a factory function, the function will be called with the {@link Bud} as the first parameter.
   *
   * @public
   */
  mixin?: (app: Bud) => Promise<Record<string, any>>

  /**
   * Boolean or a function returning a boolean indicating if the {@link Module} should be utilized.
   *
   * @remarks
   * If a factory is implemented, it will be passed the {@link Bud} instance as its first parameter and
   * a {@link Container} instance holding the {@link Module.options} (if any) as the second parameter.
   *
   * Do note that this is not the same parameter order as {@link Module.make}. That's because it is more common
   * to check the state of the {@link Bud} in the {@link Module.when} callback than the {@link Module.options}
   * (ie Checking the {@link Bud.isProduction} state).
   *
   * @public
   */
  when?:
    | boolean
    | ((app: Bud, options: Container<Options>) => boolean)
}
