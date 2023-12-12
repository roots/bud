import type {Bud} from '@roots/bud-framework'
import type {MultiStats, Stats} from '@roots/bud-framework/config'

import camelCase from '@roots/bud-support/camelCase'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError} from '@roots/bud-support/errors'
import logger from '@roots/bud-support/logger'
import Container from '@roots/container'

interface Contract {
  /**
   * Bud instance
   */
  app: Bud

  /**
   * Boot callback
   */
  boot?(app: Bud): Promise<any>

  /**
   * Bootstrap callback
   */
  bootstrap?(app: Bud): Promise<any>

  /**
   * After build callback
   */
  buildAfter?(app: Bud): Promise<any>

  /**
   * Before build callback
   */
  buildBefore?(app: Bud): Promise<any>

  /**
   * Handle errors
   */
  catch(error: BudError | string): never

  /**
   * Before compiler callback
   */
  compilerBefore?(app: Bud): Promise<any>

  /**
   * Compiler done callback
   */
  compilerDone?(bud: Bud, stats: Stats & MultiStats): Promise<any>

  /**
   * After config callback
   */
  configAfter?(app: Bud): Promise<any>

  /**
   * Before config callback
   */
  configBefore?(app: Bud): Promise<any>

  /**
   * Return the bud instance
   */
  done(): Bud

  /**
   * Scoped logger
   */
  logger: typeof logger

  /**
   * Register callback
   */
  register?(app: Bud): Promise<any>

  /**
   * Server after callback
   */
  serverAfter?(app: Bud): Promise<any>

  /**
   * Server before callback
   */
  serverBefore?(app: Bud): Promise<any>
}

/**
 * Service
 *
 * @remarks
 * The Service interface provides access to the Bud parent container.
 *
 * A Service interfaces with the Framework through a series of callbacks at different points in the build.
 */
abstract class Base implements Contract {
  /**
   * Class constructor
   */
  public constructor(public _app: () => Bud) {}

  /**
   * {@link Contract.app}
   * @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * {@link Contract.boot}
   */
  public boot?(app: Bud): Promise<any>

  /**
   * {@link Contract.bootstrap}
   */
  public bootstrap?(app: Bud): Promise<any>

  /**
   * {@link Contract.buildAfter}
   */
  public buildAfter?(app: Bud): Promise<any>

  /**
   * {@link Contract.buildBefore}
   */
  public buildBefore?(app: Bud): Promise<any>

  /**
   * {@link Contract.catch}
   */
  @bind
  public catch(error: BudError | string): never {
    if (typeof error === `string`) {
      throw BudError.normalize(error)
    }

    throw error
  }

  /**
   * {@link Contract.compilerBefore}
   */
  public compilerBefore?(app: Bud): Promise<any>

  /**
   * {@link Contract.compilerDone}
   */
  public compilerDone?(bud: Bud, stats: Stats & MultiStats): Promise<any>

  /**
   * {@link Contract.configAfter}
   */
  public configAfter?(app: Bud): Promise<any>

  /**
   * {@link Contract.done}
   */
  public done() {
    return this.app
  }

  /**
   * {@link Contract.logger}
   */
  public get logger(): typeof logger {
    const scopes = []

    this.app.isChild && scopes.push(this.app.label)
    scopes.push(camelCase(this.constructor.name))

    return logger.scope(...scopes)
  }

  /**
   * {@link Contract.register}
   */
  public register?(bud: Bud): Promise<any>

  /**
   * {@link Contract.serverAfter}
   */
  public serverAfter?(app: Bud): Promise<any>

  /**
   * {@link Contract.serverBefore}
   */
  public serverBefore?(app: Bud): Promise<any>
}

/**
 * Service
 *
 * @remarks
 * The Service interface provides access to the {@link Bud} container.
 *
 * A Service interfaces with the Framework through a series of callbacks at different points in the build.
 */
abstract class BaseContainer extends Container implements Contract {
  /**
   * Class constructor
   */
  public constructor(public _app: () => Bud) {
    super()
  }

  /**
   * {@link Contract.app}
   * @readonly
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * {@link Contract.boot}
   */
  public boot?(app: Bud): Promise<any>

  /**
   * {@link Contract.bootstrap}
   */
  public bootstrap?(app: Bud): Promise<any>

  /**
   * {@link Contract.buildAfter}
   */
  public buildAfter?(app: Bud): Promise<any>

  /**
   * {@link Contract.buildBefore}
   */
  public buildBefore?(app: Bud): Promise<any>

  /**
   * {@link Contract.catch}
   */
  @bind
  public catch(error: BudError | string): never {
    if (!error)
      throw BudError.normalize(
        `An error occured in ${this.constructor.name}`,
      )

    throw BudError.normalize(error)
  }

  /**
   * {@link Contract.compilerBefore}
   */
  public compilerBefore?(app: Bud): Promise<any>

  /**
   * {@link Contract.compilerDone}
   */
  public compilerDone?(bud: Bud, stats: Stats & MultiStats): Promise<any>

  /**
   * {@link Contract.configAfter}
   */
  public configAfter?(app: Bud): Promise<any>

  /**
   * {@link Contract.done}
   */
  public done() {
    return this.app
  }

  /**
   * {@link Contract.logger}
   */
  public get logger(): typeof logger {
    const scopes = []

    this.app.isChild && scopes.push(this.app.label)
    scopes.push(camelCase(this.constructor.name))

    return logger.scope(...scopes)
  }

  /**
   * {@link Contract.register}
   */
  public register?(bud: Bud): Promise<any>

  /**
   * {@link Contract.serverAfter}
   */
  public serverAfter?(app: Bud): Promise<any>

  /**
   * {@link Contract.serverBefore}
   */
  public serverBefore?(app: Bud): Promise<any>
}

export {
  Base,
  Base as Service,
  Base as default,
  BaseContainer,
  BaseContainer as ServiceContainer,
  type Contract,
}
