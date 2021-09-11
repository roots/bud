import {boundMethod as bind} from 'autobind-decorator'
import {isArray} from 'lodash'
import type {Class} from 'type-fest'

import {Bootstrapper} from './Bootstrapper'
import {Framework} from './Framework'

/**
 * Generic typing for a {@link Service} key-value store
 *
 * @public
 */
interface GenericRepository {
  [key: string]: any
}

/**
 * Generic type defining the {@link Service.bindClass} map of
 * {@link Class} types to {@link Framework} property keys
 *
 * @public
 */
interface GenericClassMap {
  [key: string]: Class<any> | [Class<any>, any[]]
}

/**
 * Generic type defining the {@link Service.macro} map of
 * {@link CallableFunction} types to {@link Framework} property keys
 */
interface GenericFunctionMap {
  [key: string]: CallableFunction
}

/**
 * Atomic unit of {@link Framework} functionality.
 *
 * @remarks
 * Services extend {@link Bootstrapper}, which provides {@link @roots/container#Container} and {@link Framework} access
 *
 * A {@link Service} is tapped through a series of callbacks at different points in the build.
 * Note that all of these callbacks are optional:
 *
 * - {@link Service.bootstrap} is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
 * - {@link Service.bootstrapped} is called once all Services have been instantiated.
 * - {@link Service.register} is intended for Services to register functionalities, modules, and bind functions and classes.
 * - {@link Service.registered} is called after all {@link Service.register} callbacks are complete.
 * - {@link Service.boot} is called once all services are registered. It should be safe for Services to reference one another.
 * - {@link Service.booted} is called after all {@link Service.boot} callbacks are complete.
 *
 * @typeParam Repository - {@link Repository} typing, if applicable
 *
 * @virtual
 * @public
 */
abstract class Service<
  Repository = GenericRepository,
> extends Bootstrapper<Repository> {
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
   * Bind a {@link CallableFunction} to the {@link Framework}
   *
   * @example
   * Bind a function named `fooFn` to `app.foo`
   *
   * ```js
   * app.service.bindClass({foo: fooFn})
   * ```
   *
   * @typeParam FunctionMap - Map of {@link Framework} keys to {@link CallableFunction} types
   *
   * @decorator `@bind`
   */
  @bind
  public bindMacro<FunctionMap = GenericFunctionMap>(
    properties: FunctionMap,
  ): void {
    this.app
      .container(properties)
      .getEntries()
      .map(([name, value]) => {
        this.app.bindMethod(name, value)
      })
  }

  /**
   * Bind a {@link Class} to the {@link Framework}.
   *
   * @remarks
   * Constructor parameters can be specified using an array.
   *
   * @example
   * Bind a Class named `FooClass` to `app.Foo`:
   *
   * ```js
   * app.service.bindClass({Foo: FooClass})
   * ```
   *
   * Specify constructor parameters with a tuple:
   *
   * ```js
   * app.service.bindClass({bindingName: [BindingClass, foo, bar]})
   * ```
   *
   * @typeParam Binding - Map of {@link Framework} keys to {@link Class} types
   * @decorator `@bind`
   */
  @bind
  public bindClass<ClassMap = GenericClassMap>(
    properties: ClassMap,
  ): void {
    /**
     *
     * @param accumulator - {@link T}
     * @param param - Tuple of {@link Framework} prop names and provided {@link Class} definitions
     *
     * @internal
     */
    const bindingReducer = (
      accumulator: ClassMap,
      [name, value]: [string, Class<any> | [Class<any>, any]],
    ) => {
      const [ClassObj, constructorParams] = isArray(value)
        ? value
        : [value, []]

      return {
        ...accumulator,
        [`${name}`]: new ClassObj(
          ...(isArray(constructorParams)
            ? constructorParams
            : [constructorParams]),
        ),
      }
    }

    Object.assign(
      this.app,
      Object.entries(properties).reduce(bindingReducer, {}),
    )
  }
}

export {Service}
