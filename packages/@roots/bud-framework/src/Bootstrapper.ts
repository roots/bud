/**
 * @module Framework.Bootstrapper
 */

import {Container, Repository} from '@roots/container'

import type {Framework} from './'

/**
 * Bootstrapper
 *
 * @noInheritDoc
 */
abstract class Bootstrapper<T = any> extends Container<T> {
  /**
   * @property {string} name
   */
  public name: any

  /**
   * @property {Repository} repository
   */
  public repository: Repository & T

  /**
   * @property {Framework} _app
   * @hidden
   */
  private _app: () => Framework

  /**
   * @property {Framework} app
   * @readonly
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * @constructor
   */
  public constructor(app: Framework) {
    super()

    this._app = () => app
  }

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

export {Bootstrapper}
