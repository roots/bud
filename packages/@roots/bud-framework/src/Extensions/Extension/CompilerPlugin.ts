import {Container} from '@roots/container'

import {Framework, Maybe} from '../..'
import {ApplyPlugin, Module} from './'

/**
 * Compiler plugin interface
 *
 * @public
 */
export default interface CompilerPlugin<
  Plugin = ApplyPlugin,
  Options = unknown,
> extends Module {
  /**
   * {@inheritDoc Module.name}
   *
   * @public
   */
  name: Module['name']

  /**
   * {@inheritDoc Module.options}
   *
   * @public
   */
  options?: Maybe<[Framework], Options>

  /**
   * Either a factory function returning a finalized {@link ApplyPlugin} or a literal
   * {@link ApplyPlugin}.
   *
   * @remarks
   * If a factory is implemented, it will be passed a {@link Container} instance holding
   * the {@link Module} options (if any) as well as the {@link Framework} instance.
   *
   * @public
   */
  make?: Maybe<
    [Container<Options>, Framework],
    Plugin & ApplyPlugin
  >

  /**
   * The {@link ApplyPlugin.apply} method
   *
   * @remarks
   * This function makes the {@link @roots/bud-framework#Extension.Module} interoperable with
   * the Webpack plugin interface
   *
   * @public
   */
  apply?: Plugin & ApplyPlugin['apply']

  /**
   * {@inheritDoc Module.when}
   *
   * @public
   */
  when?: Module['when']
}
