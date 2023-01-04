import Container from '@roots/container'

import {lowerCase} from '../../bud-support/lib/lodash/index.js'
import type {Bud} from './index.js'
import type {
  CLIContext,
  CommandContext,
  Context,
} from './types/options/context.js'
import type {Logger} from './types/services/logger/index.js'

interface Contract {
  /**
   * Bud instance getter
   *
   * @public
   */
  app?: Bud & {context: CommandContext | CLIContext | Context}

  /**
   * Scopoed logger
   *
   * @public
   */
  logger: Logger

  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   *
   * @public
   */
  init?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   *
   * @public
   */
  bootstrap?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available

   *
   * @public
   */
  bootstrapped?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   *
   * @public
   */
  register?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete

   *
   * @public
   */
  registered?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   *
   * @public
   */
  boot?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   *
   * @public
   */
  booted?(app?: Bud): Promise<any>

  /**
   * After config callback
   * @public
   */
  configAfter?(app?: Bud): Promise<void>

  /**
   * Before build service
   * @public
   */
  buildBefore?(app?: Bud): Promise<void>

  /**
   * After build service
   * @public
   */
  buildAfter?(app?: Bud): Promise<void>

  /**
   * Before Compiler service
   * @public
   */
  compilerBefore?(app?: Bud): Promise<void>

  /**
   * After Compiler service
   * @public
   */
  compilerAfter?(app?: Bud): Promise<void>
}

/**
 * Service
 *
 * @remarks
 * The Service interface provides access to the Bud parent container.
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
  public init?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   *
   * @public
   */
  public bootstrap?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available

   *
   * @public
   */
  public bootstrapped?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   *
   * @public
   */
  public register?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete

   *
   * @public
   */
  public registered?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   *
   * @public
   */
  public boot?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   *
   * @public
   */
  public booted?(app?: Bud): Promise<any>

  /**
   * After config callback
   * @public
   */
  public configAfter?(app?: Bud): Promise<void>

  /**
   * Before build service
   * @public
   */
  public buildBefore?(app?: Bud): Promise<void>

  /**
   * After build service
   * @public
   */
  public buildAfter?(app?: Bud): Promise<void>

  /**
   * Before Compiler service
   * @public
   */
  public compilerBefore?(app?: Bud): Promise<void>

  /**
   * After Compiler service
   * @public
   */
  public compilerAfter?(app?: Bud): Promise<void>

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
  public logger: Logger

  /**
   * Class constructor
   * @public
   */
  public constructor(public _app: () => Bud) {
    this.logger = this.app.context.logger.make(
      this.app.label,
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
   * Access {@link Bud}
   *
   * @public @readonly
   */
  public get app(): Bud & {
    context: CommandContext | CLIContext | Context
  } {
    return this._app()
  }

  /**
   * Logger instance
   *
   * @public
   */
  public logger: Logger

  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   *
   * @public
   */
  public init?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   *
   * @public
   */
  public bootstrap?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available

   *
   * @public
   */
  public bootstrapped?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   *
   * @public
   */
  public register?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete

   *
   * @public
   */
  public registered?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   *
   * @public
   */
  public boot?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   *
   * @public
   */
  public booted?(app?: Bud): Promise<void>

  /**
   * After config callback
   * @public
   */
  public configAfter?(app?: Bud): Promise<void>

  /**
   * Before build service
   * @public
   */
  public buildBefore?(app?: Bud): Promise<void>

  /**
   * After build service
   * @public
   */
  public buildAfter?(app?: Bud): Promise<void>

  /**
   * Before Compiler service
   * @public
   */
  public compilerBefore?(app?: Bud): Promise<void>

  /**
   * After Compiler service
   * @public
   */
  public compilerAfter?(app?: Bud): Promise<void>

  /**
   * Class constructor
   * @public
   */
  public constructor(public _app: () => Bud) {
    super()

    this.logger = this.app.context.logger.make(
      this.app.label,
      lowerCase(this.constructor.name),
    )
  }
}

export {
  Base,
  Base as Service,
  Base as default,
  BaseContainer,
  BaseContainer as ServiceContainer,
}
export type {Contract}
