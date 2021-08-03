import {Container, Repository} from '@roots/container'

import type {Framework} from './'

/**
 * Bootstrapper
 */
abstract class Bootstrapper<T = any> extends Container<T> {
  /**
   * Service identifier
   * @virtual
   */
  public name: any

  /** {@inheritDoc Container.repository} */
  public repository: Repository & T

  /** @hidden */
  private _app: () => Framework

  /**
   * {@link Framework} instance accessor
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
