import {lowerCase} from '@roots/bud-support/lodash-es'
import Container from '@roots/container'
import type {Signale} from 'signale'

import type {Bud} from './bud'

interface Contract {
  /**
   * Bud instance getter
   *
   * @public
   */
  app: Bud

  /**
   * Scopoed logger
   *
   * @public
   */
  logger: Signale

  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   *
   * @public
   */
  init?(app: Bud): Promise<unknown>

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   *
   * @public
   */
  bootstrap?(app: Bud): Promise<any>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available

   *
   * @public
   */
  bootstrapped?(app: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   *
   * @public
   */
  register?(app: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete

   *
   * @public
   */
  registered?(app: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   *
   * @public
   */
  boot?(app: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   *
   * @public
   */
  booted?(app: Bud): Promise<any>

  /**
   * After config callback
   * @public
   */
  configAfter?(app: Bud): Promise<unknown>

  /**
   * Before build service
   * @public
   */
  buildBefore?(app: Bud): Promise<unknown>

  /**
   * After build service
   * @public
   */
  buildAfter?(app: Bud): Promise<unknown>

  /**
   * Before Compiler service
   * @public
   */
  compilerBefore?(app: Bud): Promise<unknown>

  /**
   * After Compiler service
   * @public
   */
  compilerAfter?(app: Bud): Promise<unknown>
}

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
abstract class Base implements Partial<Contract> {
  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   *
   * @public
   */
  public init?(app: Bud): Promise<unknown>

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   *
   * @public
   */
  public bootstrap?(app: Bud): Promise<any>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available

   *
   * @public
   */
  public bootstrapped?(app: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   *
   * @public
   */
  public register?(app: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete

   *
   * @public
   */
  public registered?(app: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   *
   * @public
   */
  public boot?(app: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   *
   * @public
   */
  public booted?(app: Bud): Promise<any>

  /**
   * After config callback
   * @public
   */
  public configAfter?(app: Bud): Promise<unknown>

  /**
   * Before build service
   * @public
   */
  public buildBefore?(app: Bud): Promise<unknown>

  /**
   * After build service
   * @public
   */
  public buildAfter?(app: Bud): Promise<unknown>

  /**
   * Before Compiler service
   * @public
   */
  public compilerBefore?(app: Bud): Promise<unknown>

  /**
   * After Compiler service
   * @public
   */
  public compilerAfter?(app: Bud): Promise<unknown>
  /**
   * Service label
   *
   * @public
   * @virtual
   */
  public static label: string

  /**
   * Access {@link Bud}
   *
   * @public @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Logger instance
   *
   * @public
   */
  public logger: Signale

  /**
   * Class constructor
   * @public
   */
  public constructor(public _app: () => Bud) {
    this.logger = this.app.logger.instance.scope(
      ...this.app.logger.scope,
      lowerCase(this.constructor.name),
    )
  }
}

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
abstract class BaseContainer
  extends Container
  implements Partial<Contract>
{
  /**
   * Service label
   *
   * @public
   * @virtual
   */
  public static label: string

  /**
   * Access {@link Bud}
   *
   * @public @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Logger instance
   *
   * @public
   */
  public logger: Signale

  /**
   * Class constructor
   * @public
   */
  public constructor(public _app: () => Bud) {
    super()

    this.logger = this.app.logger.instance.scope(
      ...this.app.logger.scope,
      lowerCase(this.constructor.name),
    )
  }
}

export {
  Base,
  Base as Service,
  BaseContainer,
  BaseContainer as ServiceContainer,
}
export type {Contract}
