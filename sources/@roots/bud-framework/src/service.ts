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
  init(app: Bud): Promise<void | unknown>

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  bootstrap(app: Bud): Promise<void | unknown>

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available
   */
  bootstrapped(app: Bud): Promise<void | unknown>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   */
  register(app: Bud): Promise<void | unknown>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete
   */
  registered(app: Bud): Promise<void | unknown>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.
   */
  boot(app: Bud): Promise<void | unknown>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   */
  booted(app: Bud): Promise<void | unknown>

  /**
   * After config callback
   */
  configAfter(app: Bud): Promise<void | unknown>

  /**
   * Before build service
   */
  buildBefore(app: Bud): Promise<void | unknown>

  /**
   * After build service
   */
  buildAfter(app: Bud): Promise<void | unknown>

  /**
   * Before Compiler service
   */
  compilerBefore(app: Bud): Promise<void | unknown>

  /**
   * After Compiler service
   */
  compilerAfter(app: Bud): Promise<void | unknown>
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
  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   */
  public async init(app: Bud) {}

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  public async bootstrap(app: Bud) {}

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available
   */
  public async bootstrapped(app: Bud) {}

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   */
  public async register(app: Bud) {}

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete
   */
  public async registered(app: Bud) {}

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.
   */
  public async boot(app: Bud) {}

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   */
  public async booted(app: Bud) {}

  /**
   * After config callback
   */
  public async configAfter(app: Bud) {}

  /**
   * Before build service
   */
  public async buildBefore(app: Bud) {}

  /**
   * After build service
   */
  public async buildAfter(app: Bud) {}

  /**
   * Before Compiler service
   */
  public async compilerBefore(app: Bud) {}

  /**
   * After Compiler service
   */
  public async compilerAfter(app: Bud) {}

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
  public logger: Logger

  /**
   * Class constructor
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
  public logger: Logger

  /**
   * Lifecycle method: init
   *
   * @remarks
   * `init` is called when the Service is instantiated
   */
  public async init(app: Bud) {}

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  public async bootstrap(app: Bud) {}

  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Called once all Service instances are available
   */
  public async bootstrapped(app: Bud) {}

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   */
  public async register(app: Bud) {}

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after `register` is complete
   */
  public async registered(app: Bud) {}

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.
   */
  public async boot(app: Bud) {}

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after `boot`
   */
  public async booted(app: Bud) {}

  /**
   * After config callback
   */
  public async configAfter(app: Bud) {}

  /**
   * Before build service
   */
  public async buildBefore(app: Bud) {}

  /**
   * After build service
   */
  public async buildAfter(app: Bud) {}

  /**
   * Before Compiler service
   */
  public async compilerBefore(app: Bud) {}

  /**
   * After Compiler service
   */
  public async compilerAfter(app: Bud) {}

  /**
   * Class constructor
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
