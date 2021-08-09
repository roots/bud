import {Container} from '@roots/container'

import type {Framework} from './'

/**
 * Provides container functionality and access to {@link Framework} instance.
 *
 * @public
 */
abstract class Bootstrapper<T = any> extends Container<T> {
  /** @hidden */
  private _app: () => Framework

  /**
   * Service identifier
   * @virtual
   */
  public name: any

  /**
   * Container repository
   */
  public repository: T & Framework.Index

  /**
   * Access {@link Framework Framework} instance
   *
   * @readonly
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * Class constructor
   */
  public constructor(app: Framework) {
    super()

    this._app = () => app
  }
}

export {Bootstrapper}
