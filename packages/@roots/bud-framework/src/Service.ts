import {boundMethod as bind} from 'autobind-decorator'
import {isArray} from 'lodash'
import type {Class} from 'type-fest'

import {Bootstrapper, Framework} from './'

/**
 * Atomic unit of {@link Framework} functionality.
 *
 * @remarks
 * Services extend the {@link Container} class.
 *
 * All services must be defined during instantiation of the {@link Framework}.
 *
 * A Service provides functionality through a series of lifecycle callbacks, which are all optional:
 *
 * - {@link Service.bootstrap bootstrap} is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
 * - {@link Service.bootstrapped bootstrapped} is called once all Services have been instantiated.
 *
 * - {@link Service.register register} is intended for Services to register functionalities, modules, and bind functions and classes.
 * - {@link Service.registered registered} is called after all {@link Service.register} callbacks are complete.
 *
 * - {@link Service.boot boot} is called once all services are registered. It should be safe for Services to reference one another.
 * - {@link Service.booted booted} is called after all {@link Service.boot} callbacks are complete.
 *
 * @typeParam T - Container repository typing, if applicable
 * @public
 */
abstract class Service<
  T = {[key: string]: any},
> extends Bootstrapper<T> {
  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   *
   * @virtual
   */
  public bootstrap?(app: Framework): any

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * `bootstrapped` is called once all Services have been instantiated.
   *
   * @virtual
   */
  public bootstrapped?(app: Framework): any

  /**
   * Lifecycle method: register
   *
   * @remarks
   * `register` is intended for Services to register functionalities, modules, and bind functions and classes.
   *
   * @virtual
   */
  public register?(app: Framework): any

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after all {@link Service.register} callbacks are complete.
   *
   * @virtual
   */
  public registered?(app: Framework): any

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered. It should be safe for Services to reference one another.
   *
   * @virtual
   */
  public boot?(app: Framework): any

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after all {@link Service.boot} callbacks are complete.
   *
   * @virtual
   */
  public booted?(app: Framework): any

  /**
   * Class constructor
   */
  public constructor(app: Framework) {
    super(app)
  }

  /**
   * Bind a {@link CallableFunction} to the {@link Framework}.
   *
   * @example
   *
   * Bind to `app.boundFnName`:
   *
   * ```js
   * app.service.bindClass({boundFnName: BindingClass})
   * ```
   *
   * @decorator `@bind`
   */
  @bind
  public bindMacro<
    T = {
      [key: string]: CallableFunction
    },
  >(properties: T): void {
    Object.assign(
      this.app,
      this.app
        .container<T>(properties)
        .getEntries()
        .reduce((acc, [name, value]) => {
          return {...acc, [`${name}`]: value.bind(this.app)}
        }, {}),
    )
  }

  /**
   * Bind a {@link Class} to the {@link Framework}.
   *
   * @remarks
   *
   * Constructor parameters can be specified using an array.
   *
   * @example
   *
   * Bind to `app.bindingName`:
   *
   * ```js
   * app.service.bindClass({bindingName: BindingClass})
   * ```
   *
   * @example
   *
   * Specify constructor parameters to pass to `BindingClass` during instantiation.
   *
   * ```js
   * app.service.bindClass({bindingName: [BindingClass, foo, bar]})
   * ```
   *
   * @decorator `@bind`
   */
  @bind
  public bindClass<
    T = {
      [key: string]: Class | [Class, any[]]
    },
  >(properties: T): void {
    Object.assign(
      this.app,
      this.app
        .container<T>(properties)
        .getEntries()
        .reduce((acc, [name, value]) => {
          const [ClassObj, constructorParams] = isArray(value)
            ? value
            : [value, []]

          return {
            ...acc,
            [`${name}`]: new ClassObj(
              ...(isArray(constructorParams)
                ? constructorParams
                : [constructorParams]),
            ),
          }
        }, {}),
    )
  }
}

export {Service}
