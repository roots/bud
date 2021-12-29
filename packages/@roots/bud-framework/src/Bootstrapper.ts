import {Container} from '@roots/container'

import {Framework} from './'

/**
 * Base service class
 *
 * @public
 */
export abstract class Bootstrapper<
  T = any,
> extends Container<T> {
  /**
   * @internal
   */
  private _app: () => Framework

  /**
   * Service identifier
   *
   * @public
   */
  public abstract ident?: string

  /**
   * Access {@link Framework}

   *
   * @public @readonly
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * Class constructor
   *
   * @param app - {@link Framework}

   *
   * @public
   */
  public constructor(app: Framework) {
    super()

    this._app = () => app
  }
}
