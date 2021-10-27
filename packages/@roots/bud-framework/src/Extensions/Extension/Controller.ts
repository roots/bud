import {Framework} from '../../Framework'
import {Hooks} from '../../Hooks'
import {Extension, Name} from './'

/**
 * Extension controller instance
 *
 * @public @core
 */
export interface Controller {
  /**
   * {@inheritDoc Framework}
   *
   * @public
   */
  app: Framework

  /**
   * {@inheritDoc Extension.Module}
   *
   * @public
   */
  module: Extension

  /**
   * {@inheritDoc Extension.Module.name}
   *
   * @public
   */
  name: Extension['name']

  /**
   * {@inheritDoc Extension.Module.options}
   *
   * @public
   */
  options: Extension['options']

  /**
   * {@inheritDoc Extension.Module.when}
   *
   * @public
   */
  when: Extension['when']

  /**
   * Callback which returns a Plugin for compilation
   *
   * @public
   */
  make: Extension['make']

  /**
   * A native plugin instance
   *
   * @public
   */
  apply: Extension['apply']

  /**
   * An extension registration function
   *
   * @returns {@link Controller}
   *
   * @public
   */
  register(): this

  /**
   * An extension boot function
   *
   * @returns {@link Controller}
   *
   * @public
   */
  boot(): this

  /**
   * Make a {@link @roots/bud-framework#Hooks.name | hook name} from a
   * {@link @roots/bud-framework#Module.name}
   *
   * @param name - The module name
   * @returns string
   *
   * @public
   */
  makeKey(key: Name): Hooks.Name

  /**
   * Get the value of an extension property
   *
   * @param name - The module name
   *
   * @public
   */
  get(key: Name): any

  /**
   * Set the value of an extension property
   *
   * @param name - The module name
   * @returns void
   *
   * @public
   */
  set(key: Name, value: any): void
}
