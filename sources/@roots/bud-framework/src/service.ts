import Container from '@roots/container'

import type {Bud} from './bud.js'

/**
 * Service
 *
 * @remarks
 * The Service interface provides access to the {@link Bud} container.
 *
 * A Service interfaces with the Framework through a series of callbacks at different points in the build.
 *
 * @public
 */
export class Service {
  /**
   * @internal @readonly
   */
  public _app: () => Bud

  /**
   * After config callback
   * @public
   */
  public afterConfig?(app: Bud): Promise<unknown>

  /**
   * Access {@link Bud}
   *
   * @public @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Class constructor
   * @public
   */
  public constructor(app: Bud) {
    this._app = () => app
  }

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   *
   * @virtual @public
   */
  public bootstrap?(app: Bud): Promise<any>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available

   *
   * @virtual @public
   */
  public bootstrapped?(app: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   *
   * @virtual @public
   */
  public register?(app: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete

   *
   * @virtual @public
   */
  public registered?(app: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   *
   * @virtual @public
   */
  public boot?(app: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`

   *
   * @virtual @public
   */
  public booted?(app: Bud): Promise<any>
}

/**
 * Container service
 *
 * @public
 */
export class ContainerService<T = any> extends Container<T> {
  /**
   * @readonly @internal
   */
  public _app: () => Bud

  /**
   * Access {@link Bud}
   * @public @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(app: Bud) {
    super()
    this._app = () => app
  }

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   *
   * @virtual @public
   */
  public bootstrap?(app: Bud): Promise<any>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available
   *
   * @virtual @public
   */
  public bootstrapped?(app: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Method for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   *
   * @virtual @public
   */
  public register?(app: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` callback is processed
   *
   * @virtual @public
   */
  public registered?(app: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.
   *
   * @virtual @public
   */
  public boot?(app: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot` callback is processed

   *
   * @virtual @public
   */
  public booted?(app: Bud): Promise<any>
}
