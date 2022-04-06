import {bind, chalk,lodash} from '@roots/bud-support'
import { Container } from '@roots/container'

import {Bud} from './bud'
import {Logger} from './logger'

const {isString, isUndefined} = lodash

/** 
 * @remarks
 * The {@link Service} interface extends {@link Bootstrapper}, which provides {@link @roots/container#Container}
 * and {@link Bud} access
 * 
 * A {@link Service} is tapped through a series of callbacks at different points in the build.
 * 
 * All of the callbacks are optional:
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
 * @public
 */
export class Service {
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
   * Called once all {@link Service} instances are available.
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public bootstrapped?(app: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for {@link Service} instances to register functionalities, modules, and bind functions and classes to the {@link Bud}
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public register?(app: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after all {@link Service.register} callbacks are complete.
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public registered?(app: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered. It should be safe for Services to reference one another.
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public boot?(app: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after all {@link Service.boot} callbacks are complete.
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public booted?(app: Bud): Promise<any>

  /**
   * Service scoped logger
   *
   * @public
   */
  public get logger(): Logger['instance'] {
    return this.app.logger.instance
  }

  /**
   * Log a message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public log(type: string, ...messages: any[]) {
    this.app.store.is('features.log', true) &&
      this.logger[type](
        ...messages.reduce(
          (
            acc,
            loggedItem: string | {message?: string; suffix?: string},
          ) => {
            if (
              typeof loggedItem !== 'string' &&
              !isUndefined(loggedItem?.suffix) &&
              isString(loggedItem?.suffix)
            ) {
              loggedItem.suffix = chalk.dim(
                loggedItem.suffix.replace(
                  this.app.context.projectDir,
                  '.',
                ),
              )
            }

            return [...acc, loggedItem]
          },
          [],
        ),
      )

    return this
  }
}

/**
 * Container service
 *
 * @public
 */
export abstract class ContainerService<T = any> extends Container<T> {
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
   * Called once all {@link Service} instances are available.
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public bootstrapped?(app: Bud): Promise<any>

  /**
   * Lifecycle method: register
   *
   * @remarks
   * Intended for {@link Service} instances to register functionalities, modules, and bind functions and classes to the {@link Bud}
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public register?(app: Bud): Promise<any>

  /**
   * Lifecycle method: registered
   *
   * @remarks
   * `registered` is called after all {@link Service.register} callbacks are complete.
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public registered?(app: Bud): Promise<any>

  /**
   * Lifecycle method: boot
   *
   * @remarks
   * `boot` is called once all services are registered. It should be safe for Services to reference one another.
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public boot?(app: Bud): Promise<any>

  /**
   * Lifecycle method: booted
   *
   * @remarks
   * `booted` is called after all {@link Service.boot} callbacks are complete.
   *
   * @param app - {@link Bud}
   *
   * @virtual @public
   */
  public booted?(app: Bud): Promise<any>

  /**
   * Service scoped logger
   *
   * @public
   */
  public get logger(): Logger['instance'] {
    return this.app.logger.instance
  }

  /**
   * Log a message
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public log(type: string, ...messages: any[]) {
    this.app.store.is('features.log', true) &&
      this.logger[type](
        ...messages.reduce(
          (
            acc,
            loggedItem: string | {message?: string; suffix?: string},
          ) => {
            if (
              typeof loggedItem !== 'string' &&
              !isUndefined(loggedItem?.suffix) &&
              isString(loggedItem?.suffix)
            ) {
              loggedItem.suffix = chalk.dim(
                loggedItem.suffix.replace(
                  this.app.context.projectDir,
                  '.',
                ),
              )
            }

            return [...acc, loggedItem]
          },
          [],
        ),
      )

    return this
  }
}
