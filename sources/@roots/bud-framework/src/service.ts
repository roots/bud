import camelCase from '@roots/bud-support/lodash/camelCase'
import logger from '@roots/bud-support/logger'
import Container from '@roots/container'

import type {Bud} from './index.js'

interface Contract {
  _app: () => Bud

  /**
   * Bud instance
   */
  app: Bud

  /**
   * Scoped logger
   */
  logger: typeof logger

  /**
   * Service label
   */
  label: string

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  bootstrap(app: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   */
  register(app: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   */
  boot(app: Bud): Promise<any>

  /**
   * After config callback
   */
  configAfter?(app?: Bud): Promise<any>

  /**
   * Before build service
   */
  buildBefore?(app?: Bud): Promise<any>

  /**
   * After build service
   */
  buildAfter?(app?: Bud): Promise<any>

  /**
   * Before Compiler service
   */
  compilerBefore?(app?: Bud): Promise<any>

  /**
   * After Compiler service
   */
  compilerAfter?(app?: Bud): Promise<any>
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
   * Bud instance
   * @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Logger instance
   */
  public get logger(): typeof logger {
    return logger.scope(this.app.label, camelCase(this.constructor.name))
  }

  /**
   * Service ID
   */
  public ident?: string

  /**
   * Service label
   */
  public get label() {
    return this.ident ?? camelCase(this.constructor.name)
  }

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  public async bootstrap(_app: Bud): Promise<any> {}

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   */
  public async register(_app: Bud): Promise<any> {}

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.

   */
  public async boot(_app: Bud): Promise<any> {}

  /**
   * After config callback
   */
  public configAfter?(app?: Bud): Promise<any>

  /**
   * Before build service
   */
  public buildBefore?(app?: Bud): Promise<any>

  /**
   * After build service
   */
  public buildAfter?(app?: Bud): Promise<any>

  /**
   * Before Compiler service
   */
  public compilerBefore?(app?: Bud): Promise<any>

  /**
   * After Compiler service
   */
  public compilerAfter?(app?: Bud): Promise<any>

  /**
   * Class constructor
   */
  public constructor(public _app: () => Bud) {}
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
  public get app(): Bud {
    return this._app()
  }

  /**
   * Logger instance
   */
  public get logger(): typeof logger {
    return logger.scope(this.app.label, camelCase(this.constructor.name))
  }

  /**
   * Lifecycle method: bootstrap
   *
   * @remarks
   * `bootstrap` is called when the Service is instantiated (but before all services are guaranteed to be instantiated).
   */
  public async bootstrap(app: Bud): Promise<any> {}

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for Service instances to register functionalities, modules,
   * and bind functions to {@link Bud}
   */
  public async register(app: Bud): Promise<any> {}

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered.
   */
  public async boot(app: Bud): Promise<any> {}

  /**
   * After config callback
   */
  public configAfter?(app?: Bud): Promise<any>

  /**
   * Before build service
   */
  public buildBefore?(app?: Bud): Promise<any>

  /**
   * After build service
   */
  public buildAfter?(app?: Bud): Promise<any>

  /**
   * Before Compiler service
   */
  public compilerBefore?(app?: Bud): Promise<any>

  /**
   * After Compiler service
   */
  public compilerAfter?(app?: Bud): Promise<any>

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
