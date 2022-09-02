import {lowerCase} from 'lodash-es'
import type {Signale} from 'signale'

import type {Bud} from './bud'

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
   * Service label
   *
   * @public
   * @virtual
   */
  public static label: string

  /**
   * @internal @readonly
   */
  public _app: () => Bud

  /**
   * Access {@link Bud}
   *
   * @public @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  public logger: Signale

  /**
   * Class constructor
   * @public
   */
  public constructor(app: Bud) {
    this._app = () => app
    this.logger = app.logger.instance.scope(
      ...app.logger.scope,
      lowerCase(this.constructor.name),
    )
  }

  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   *
   * @virtual @public
   */
  public init?(app: Bud): Promise<unknown>

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
}
