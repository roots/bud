import {Container} from '@roots/container'
import type {Framework} from './Framework'

/**
 * @abstract Bootstrapper
 *
 * {@link Service} base class.
 *
 * {@link Logger} and {@link Store} extend this directly
 * since they are needed before the lifecycle even starts up.
 *
 * @noInheritDoc
 */
abstract class Bootstrapper<T = any> extends Container<T> {
  /**
   * Bootstrap
   * @internal
   */
  public bootstrap?(app: Framework): any

  /**
   * Bootstrapped
   * @internal
   */
  public bootstrapped?(app: Framework): any

  /**
   * Register
   * @internal
   */
  public register?(app: Framework): any

  /**
   * Post registered callback
   * @internal
   */
  public registered?(app: Framework): any

  /**
   * Boot
   * @internal
   */
  public boot?(app: Framework): any

  /**
   * Post boot callback
   * @internal
   */
  public booted?(app: Framework): any
}

/**
 * @abstract Service
 *
 * The atomic unit of Framework functionality.
 *
 * @noInheritDoc
 */
abstract class Service<T = any> extends Bootstrapper<T> {
  public name: string

  private _app: () => Framework

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework) {
    super()

    this._app = () => app
  }
}

export {Bootstrapper, Service}
