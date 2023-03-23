import lowerCase from '@roots/bud-support/lodash/lowerCase'
import Container from '@roots/container'

import type {Bud} from './index.js'
import type {
  CLIContext,
  CommandContext,
  Context,
} from './types/options/context.js'
import type {Logger} from './types/services/logger/index.js'

interface Contract {
  _app: () => Bud

  /**
   * Bud instance
   */
  app: Bud & {context: CommandContext | CLIContext | Context}

  /**
   * Scoped logger
   */
  logger: Logger

  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   */
  init?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  bootstrap?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available

   */
  bootstrapped?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   */
  register?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete

   */
  registered?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   */
  boot?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   */
  booted?(app?: Bud): Promise<any>

  /**
   * After config callback
   */
  configAfter?(app?: Bud): Promise<void>

  /**
   * Before build service
   */
  buildBefore?(app?: Bud): Promise<void>

  /**
   * After build service
   */
  buildAfter?(app?: Bud): Promise<void>

  /**
   * Before Compiler service
   */
  compilerBefore?(app?: Bud): Promise<void>

  /**
   * After Compiler service
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
 */
abstract class Base implements Partial<Contract> {
  public declare _app: () => Bud

  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   */
  public init?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  public bootstrap?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available

   */
  public bootstrapped?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   */
  public register?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete

   */
  public registered?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   */
  public boot?(app?: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   */
  public booted?(app?: Bud): Promise<any>

  /**
   * After config callback
   */
  public configAfter?(app?: Bud): Promise<void>

  /**
   * Before build service
   */
  public buildBefore?(app?: Bud): Promise<void>

  /**
   * After build service
   */
  public buildAfter?(app?: Bud): Promise<void>

  /**
   * Before Compiler service
   */
  public compilerBefore?(app?: Bud): Promise<void>

  /**
   * After Compiler service
   */
  public compilerAfter?(app?: Bud): Promise<void>

  /**
   * Bud instance
   * @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Logger instance
   */
  public get logger() {
    return this.app.context.logger.scope(
      this.app.label,
      lowerCase(this.constructor.name),
    )
  }

  /**
   * Class constructor
   */
  public constructor(_app: () => Bud) {
    this._app = _app
  }
}

/**
 * Service
 *
 * @remarks
 * The Service interface provides access to the {@link Bud} container.
 *
 * A Service interfaces with the Framework through a series of callbacks at different points in the build.
 */
abstract class BaseContainer
  extends Container
  implements Partial<Contract>
{
  /**
   * Bud instance
   * @readonly
   */
  public get app(): Bud & {
    context: CommandContext | CLIContext | Context
  } {
    return this._app()
  }

  /**
   * Logger instance
   */
  public get logger() {
    return this.app.context.logger.scope(
      this.app.label,
      lowerCase(this.constructor.name),
    )
  }

  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   */
  public init?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  public bootstrap?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available
   */
  public bootstrapped?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   */
  public register?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete
   */
  public registered?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.
   */
  public boot?(app?: Bud): Promise<void>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   */
  public booted?(app?: Bud): Promise<void>

  /**
   * After config callback
   */
  public configAfter?(app?: Bud): Promise<void>

  /**
   * Before build service
   */
  public buildBefore?(app?: Bud): Promise<void>

  /**
   * After build service
   */
  public buildAfter?(app?: Bud): Promise<void>

  /**
   * Before Compiler service
   */
  public compilerBefore?(app?: Bud): Promise<void>

  /**
   * After Compiler service
   */
  public compilerAfter?(app?: Bud): Promise<void>

  /**
   * Class constructor
   */
  public constructor(public _app: () => Bud) {
    super()
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
