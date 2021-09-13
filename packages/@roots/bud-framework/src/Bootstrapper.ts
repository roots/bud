import {Container} from '@roots/container'

import {Framework} from './'

/**
 * Provides {@link @roots/container# | Container}
 * functionality and access to {@link Framework}
.
 *
 * @public @core @container
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
  public name: any

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
