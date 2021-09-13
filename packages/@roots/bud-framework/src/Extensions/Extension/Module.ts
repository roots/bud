import {Container} from '@roots/container'

import {Factory, Framework, Index, Loose, Maybe} from '../..'
import {ApplyPlugin, Name} from './'

/**
 * Bud {@link Extension} interface
 *
 * @typeParam Options - Extension options
 *
 * @public @core
 */
export default interface Module<Options = unknown>
  extends Loose {
  /**
   * The module name
   *
   * @public
   */
  name?: Name

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
  register?: Factory<[Framework], unknown>

  /**
   * General purpose callback. Called after everything else.
   *
   * @public
   */
  boot?: Factory<[Framework], unknown>

  /**
   * Objects to bind to the framework. May be expressed as an object literal or a factory function.
   *
   * @remarks
   * You might also use {@link @roots/bud-framework#Service.bindMacro} from {@link Module.register} or {@link Module.boot}
   * to accomplish the same thing.
   *
   * If expressed as a factory function, the function will be called with the {@link Framework} as the first parameter.
   *
   * @public
   */
  api?: Maybe<[Framework], Index<unknown>>

  /**
   * Either a function returning a finalized {@link ApplyPlugin} or a literal {@link ApplyPlugin}.
   *
   * @deprecated Convert this to a {@link @roots/bud-framework#Extension.CompilerPlugin | CompilerPlugin}
   *
   * @remarks
   * If a factory is implemented, it will be passed a {@link Container} instance holding
   * the {@link Module.options} (if any) as well as the {@link Framework} instance.
   *
   * @public
   */
  make?: Maybe<[Container<Options>, Framework], ApplyPlugin>

  /**
   * The {@link ApplyPlugin.apply} method
   *
   * @deprecated Convert this to a {@link @roots/bud-framework#Extension.CompilerPlugin | CompilerPlugin}
   *
   * @remarks
   * This function makes the {@link @roots/bud-framework#Extension.Module} interoperable with
   * the Webpack plugin interface
   *
   * @public
   */
  apply?: ApplyPlugin

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
