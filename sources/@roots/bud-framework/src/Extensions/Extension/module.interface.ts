import {Container} from '@roots/container'

import {Factory, Framework, Loose, Maybe, Modules, Plugins} from '../..'

/**
 * Bud extension interface
 *
 * @typeParam Options - Extension options
 *
 * @public
 */
export interface Module<Options = any> extends Loose {
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
  options?: Maybe<[Framework], Options>

  /**
   * General purpose callback. Called first.
   *
   * @public
   */
  register?: Factory<[Framework, Console], any>

  /**
   * General purpose callback. Called after everything else.
   *
   * @public
   */
  boot?: Factory<[Framework, Console], any>

  /**
   * Objects to bind to the framework. May be expressed as an object literal or a factory function.
   *
   * @remarks
   * You might also use {@link @roots/bud-framework#Service.bindMethod | bindMethod} to accomplish the same thing.
   *
   * If expressed as a factory function, the function will be called with the {@link Framework} as the first parameter.
   *
   * @public
   */
  api?:
    | ((app: Framework) => Promise<Record<string, CallableFunction>>)
    | Record<string, CallableFunction>

  /**
   * Objects to bind to the framework. May be expressed as an object literal or a factory function.
   *
   * @remarks
   * You might also use {@link @roots/bud-framework#Service.bindClass | bindClass} to accomplish the same thing.
   *
   * If expressed as a factory function, the function will be called with the {@link Framework} as the first parameter.
   *
   * @public
   */
  mixin?: (app: Framework) => Promise<Record<string, any>>

  /**
   * Boolean or a function returning a boolean indicating if the {@link Module} should be utilized.
   *
   * @remarks
   * If a factory is implemented, it will be passed the {@link Framework} instance as its first parameter and
   * a {@link Container} instance holding the {@link Module.options} (if any) as the second parameter.
   *
   * Do note that this is not the same parameter order as {@link Module.make}. That's because it is more common
   * to check the state of the {@link Framework} in the {@link Module.when} callback than the {@link Module.options}
   * (ie Checking the {@link Framework.isProduction} state).
   *
   * @public
   */
  when?: Maybe<[Framework, Container<Options>], boolean>
}
